class TheOneCrawlError(Exception):
    """Base exception for TheOneCrawl SDK."""

    def __init__(self, message: str, status_code: int = 0, response: object = None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response


class AuthenticationError(TheOneCrawlError):
    """Raised when the API key is invalid or missing."""

    def __init__(self, message: str = "Invalid or missing API key"):
        super().__init__(message, status_code=401)


class RateLimitError(TheOneCrawlError):
    """Raised when rate limits are exceeded."""

    def __init__(self, message: str = "Rate limit exceeded", retry_after: int | None = None):
        super().__init__(message, status_code=429)
        self.retry_after = retry_after


class InsufficientCreditsError(TheOneCrawlError):
    """Raised when the account has insufficient credits."""

    def __init__(self, message: str = "Insufficient credits"):
        super().__init__(message, status_code=402)
