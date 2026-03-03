"""Type definitions for TheOneCrawl SDK."""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Sequence, TypedDict


class BrowserAction(TypedDict, total=False):
    type: str  # wait, click, write, press, scroll, screenshot, executeJavascript, scrape
    selector: str
    milliseconds: int
    text: str
    key: str
    direction: str  # up, down
    amount: int
    script: str


class ActionResult(TypedDict, total=False):
    type: str
    success: bool
    screenshot: Optional[str]
    html: Optional[str]
    result: Any
    error: Optional[str]


class ScrapeParams(TypedDict, total=False):
    formats: Sequence[str]
    only_main_content: bool
    include_tags: Sequence[str]
    exclude_tags: Sequence[str]
    wait_for: Any  # int or str
    timeout: int
    actions: List[BrowserAction]
    headers: Dict[str, str]
    mobile: bool
    extract: Dict[str, Any]


class CrawlParams(TypedDict, total=False):
    limit: int
    max_depth: int
    include_paths: Sequence[str]
    exclude_paths: Sequence[str]
    scrape_options: ScrapeParams
    webhook: str
    webhook_secret: str
    allow_backward_links: bool
    ignore_sitemap: bool


class MapParams(TypedDict, total=False):
    search: str
    limit: int
    ignore_sitemap: bool


class ExtractParams(TypedDict, total=False):
    urls: List[str]
    prompt: str
    schema: Dict[str, Any]
    enable_web_search: bool


class BatchScrapeParams(TypedDict, total=False):
    urls: List[str]
    formats: Sequence[str]
    only_main_content: bool
    include_tags: Sequence[str]
    exclude_tags: Sequence[str]
    webhook: str
    webhook_secret: str


class BatchScrapeResponse(TypedDict):
    success: bool
    id: str
    url: str


class BatchScrapeStatusResponse(TypedDict):
    success: bool
    status: str
    total: int
    completed: int
    creditsUsed: int
    data: List[Dict[str, Any]]
    expiresAt: Optional[str]


class PageMetadata(TypedDict, total=False):
    title: str
    description: str
    language: str
    ogImage: Optional[str]
    favicon: Optional[str]
    statusCode: int
    sourceURL: Optional[str]


class ScrapeResponse(TypedDict):
    success: bool
    data: Dict[str, Any]


class CrawlResponse(TypedDict):
    success: bool
    id: str
    url: str


class CrawlStatusResponse(TypedDict):
    success: bool
    status: str
    total: int
    completed: int
    creditsUsed: int
    data: List[Dict[str, Any]]
    next: Optional[str]


class MapResponse(TypedDict):
    success: bool
    links: List[str]


class ExtractResponse(TypedDict):
    success: bool
    data: Any
    creditsUsed: Optional[int]


class CmsBlocksResponse(TypedDict):
    success: bool
    data: Dict[str, Any]
    # data contains: jobId, url, blocks, themeSuggestion, headerBlock, footerBlock, pageIndex, totalPages


class DesignSystemResponse(TypedDict):
    success: bool
    data: Dict[str, Any]
    # data contains: siteMetadata, themeSuggestion, colorPalette, fonts, technology
