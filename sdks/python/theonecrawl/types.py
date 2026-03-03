"""Type definitions for TheOneCrawl SDK."""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Sequence, TypedDict


class ScrapeParams(TypedDict, total=False):
    formats: Sequence[str]
    only_main_content: bool
    include_tags: Sequence[str]
    exclude_tags: Sequence[str]
    wait_for: int
    timeout: int
    extract: Dict[str, Any]


class CrawlParams(TypedDict, total=False):
    limit: int
    max_depth: int
    include_paths: Sequence[str]
    exclude_paths: Sequence[str]
    scrape_options: ScrapeParams
    webhook: str
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


class PageMetadata(TypedDict, total=False):
    title: str
    description: str
    language: str
    og_image: Optional[str]
    favicon: Optional[str]
    status_code: int
    source_url: Optional[str]


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
    credits_used: int
    data: List[Dict[str, Any]]
    next: Optional[str]


class MapResponse(TypedDict):
    success: bool
    links: List[str]


class ExtractResponse(TypedDict):
    success: bool
    data: Any


class CmsBlocksResponse(TypedDict):
    job_id: str
    url: str
    blocks: List[Any]
    theme_suggestion: Optional[Any]
    header_block: Optional[Any]
    footer_block: Optional[Any]


class DesignSystemResponse(TypedDict):
    job_id: str
    url: str
    design_system: Any
