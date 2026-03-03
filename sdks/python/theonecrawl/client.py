"""Synchronous TheOneCrawl client."""

from __future__ import annotations

import os
import time
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
from .types import (
    BatchScrapeParams,
    BatchScrapeResponse,
    BatchScrapeStatusResponse,
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


def _snake_to_camel(key: str) -> str:
    parts = key.split("_")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def _convert_keys(data: Any) -> Any:
    if isinstance(data, dict):
        return {_snake_to_camel(k): _convert_keys(v) for k, v in data.items()}
    if isinstance(data, (list, tuple)):
        return [_convert_keys(item) for item in data]
    return data


class TheOneCrawl:
    """Synchronous client for the TheOneCrawl API."""

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
        self._client = httpx.Client(
            base_url=self._api_url,
            headers={
                "Authorization": f"Bearer {self._api_key}",
                "User-Agent": f"theonecrawl-python/{__version__}",
            },
            timeout=60.0,
        )

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> "TheOneCrawl":
        return self

    def __exit__(self, *args: Any) -> None:
        self.close()

    # ---- Scrape ----

    def scrape_url(self, url: str, params: Optional[ScrapeParams] = None) -> ScrapeResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return self._request("POST", "/v1/scrape", json=body)

    # ---- Crawl ----

    def crawl_url(self, url: str, params: Optional[CrawlParams] = None) -> CrawlStatusResponse:
        resp = self.start_crawl(url, params)
        return self._poll_crawl(resp["id"])

    def start_crawl(self, url: str, params: Optional[CrawlParams] = None) -> CrawlResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return self._request("POST", "/v1/crawl", json=body)

    def check_crawl_status(self, crawl_id: str) -> CrawlStatusResponse:
        return self._request("GET", f"/v1/crawl/{quote(crawl_id, safe='')}")

    def cancel_crawl(self, crawl_id: str) -> Dict[str, bool]:
        return self._request("DELETE", f"/v1/crawl/{quote(crawl_id, safe='')}")

    # ---- Map ----

    def map_url(self, url: str, params: Optional[MapParams] = None) -> MapResponse:
        body: Dict[str, Any] = {"url": url}
        if params:
            body.update(_convert_keys(params))
        return self._request("POST", "/v1/map", json=body)

    # ---- Batch Scrape ----

    def batch_scrape_urls(self, params: BatchScrapeParams) -> BatchScrapeStatusResponse:
        resp = self.start_batch_scrape(params)
        return self._poll_batch_scrape(resp["id"])

    def start_batch_scrape(self, params: BatchScrapeParams) -> BatchScrapeResponse:
        return self._request("POST", "/v1/batch/scrape", json=_convert_keys(dict(params)))

    def check_batch_scrape_status(self, batch_id: str) -> BatchScrapeStatusResponse:
        return self._request("GET", f"/v1/batch/scrape/{quote(batch_id, safe='')}")

    def _poll_batch_scrape(self, batch_id: str) -> BatchScrapeStatusResponse:
        start = time.monotonic()
        while time.monotonic() - start < MAX_POLL_TIME:
            status = self.check_batch_scrape_status(batch_id)
            if status["status"] in ("completed", "failed"):
                return status
            time.sleep(POLL_INTERVAL)
        raise TheOneCrawlError("Batch scrape polling timed out after 5 minutes", 408)

    # ---- Extract ----

    def extract(self, params: ExtractParams) -> ExtractResponse:
        return self._request("POST", "/v1/extract", json=_convert_keys(dict(params)))

    # ---- TheOneCrawl exclusives ----

    def get_cms_blocks(self, crawl_id: str, page: Optional[int] = None) -> CmsBlocksResponse:
        path = f"/v1/crawl/{quote(crawl_id, safe='')}/cms-blocks"
        if page is not None:
            path += f"?page={page}"
        return self._request("GET", path)

    def get_design_system(self, crawl_id: str) -> DesignSystemResponse:
        return self._request("GET", f"/v1/crawl/{quote(crawl_id, safe='')}/design-system")

    # ---- Internal ----

    def _request(self, method: str, path: str, **kwargs: Any) -> Any:
        resp = self._client.request(method, path, **kwargs)
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

    def _poll_crawl(self, crawl_id: str) -> CrawlStatusResponse:
        start = time.monotonic()
        while time.monotonic() - start < MAX_POLL_TIME:
            status = self.check_crawl_status(crawl_id)
            if status["status"] in ("completed", "failed", "cancelled"):
                return status
            time.sleep(POLL_INTERVAL)
        raise TheOneCrawlError("Crawl polling timed out after 5 minutes", 408)
