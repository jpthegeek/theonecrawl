"""Asynchronous TheOneCrawl client."""

from __future__ import annotations

import asyncio
import os
from typing import Any, Dict, Optional
from urllib.parse import quote

import httpx

from ._version import __version__
from .errors import (
    AuthenticationError,
    InsufficientCreditsError,
    RateLimitError,
    TheOneCrawlError,
)
from .client import _convert_keys
from .types import (
    CmsBlocksResponse,
    CrawlParams,
    CrawlResponse,
    CrawlStatusResponse,
    DesignSystemResponse,
    ExtractParams,
    ExtractResponse,
    MapParams,
    MapResponse,
    ScrapeParams,
    ScrapeResponse,
)

DEFAULT_API_URL = "https://api.theonecrawl.app"
POLL_INTERVAL = 2.0
MAX_POLL_TIME = 300.0


class AsyncTheOneCrawl:
    """Async client for the TheOneCrawl API."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        api_url: Optional[str] = None,
    ) -> None:
        key = api_key or os.environ.get("THEONECRAWL_API_KEY")
        if not key:
            raise AuthenticationError(
                "API key is required. Pass api_key or set THEONECRAWL_API_KEY env var."
            )
        self._api_key = key
        self._api_url = (api_url or DEFAULT_API_URL).rstrip("/")
        self._client = httpx.AsyncClient(
            base_url=self._api_url,
            headers={
                "Authorization": f"Bearer {self._api_key}",
                "User-Agent": f"theonecrawl-python/{__version__}",
            },
            timeout=60.0,
        )

    async def close(self) -> None:
        await self._client.aclose()

    async def __aenter__(self) -> "AsyncTheOneCrawl":
        return self

    async def __aexit__(self, *args: Any) -> None:
        await self.close()

    # ---- Scrape ----

    async def scrape_url(self, url: str, params: Optional[ScrapeParams] = None) -> ScrapeResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return await self._request("POST", "/v1/scrape", json=body)

    # ---- Crawl ----

    async def crawl_url(
        self, url: str, params: Optional[CrawlParams] = None
    ) -> CrawlStatusResponse:
        resp = await self.start_crawl(url, params)
        return await self._poll_crawl(resp["id"])

    async def start_crawl(
        self, url: str, params: Optional[CrawlParams] = None
    ) -> CrawlResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return await self._request("POST", "/v1/crawl", json=body)

    async def check_crawl_status(self, crawl_id: str) -> CrawlStatusResponse:
        return await self._request("GET", f"/v1/crawl/{quote(crawl_id, safe='')}")

    async def cancel_crawl(self, crawl_id: str) -> Dict[str, bool]:
        return await self._request("DELETE", f"/v1/crawl/{quote(crawl_id, safe='')}")

    # ---- Map ----

    async def map_url(self, url: str, params: Optional[MapParams] = None) -> MapResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return await self._request("POST", "/v1/map", json=body)

    # ---- Extract ----

    async def extract(self, params: ExtractParams) -> ExtractResponse:
        return await self._request("POST", "/v1/extract", json=_convert_keys(dict(params)))

    # ---- TheOneCrawl exclusives ----

    async def get_cms_blocks(
        self, crawl_id: str, page: Optional[int] = None
    ) -> CmsBlocksResponse:
        path = f"/v1/crawl/{quote(crawl_id, safe='')}/cms-blocks"
        if page is not None:
            path += f"?page={page}"
        return await self._request("GET", path)

    async def get_design_system(self, crawl_id: str) -> DesignSystemResponse:
        return await self._request("GET", f"/v1/crawl/{quote(crawl_id, safe='')}/design-system")

    # ---- Internal ----

    async def _request(self, method: str, path: str, **kwargs: Any) -> Any:
        resp = await self._client.request(method, path, **kwargs)
        if resp.status_code == 401:
            raise AuthenticationError()
        if resp.status_code == 402:
            raise InsufficientCreditsError()
        if resp.status_code == 429:
            retry = resp.headers.get("Retry-After")
            raise RateLimitError(retry_after=int(retry) if retry else None)
        if not resp.is_success:
            try:
                data = resp.json()
                msg = data.get("error", f"Request failed with status {resp.status_code}")
            except Exception:
                msg = f"Request failed with status {resp.status_code}"
            raise TheOneCrawlError(msg, resp.status_code)
        return resp.json()

    async def _poll_crawl(self, crawl_id: str) -> CrawlStatusResponse:
        elapsed = 0.0
        while elapsed < MAX_POLL_TIME:
            status = await self.check_crawl_status(crawl_id)
            if status["status"] in ("completed", "failed", "cancelled"):
                return status
            await asyncio.sleep(POLL_INTERVAL)
            elapsed += POLL_INTERVAL
        raise TheOneCrawlError("Crawl polling timed out after 5 minutes", 408)
