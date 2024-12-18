export declare enum EDappActionErrorTag {
    NEW_ACTION_STARTED = "NEW_ACTION_STARTED",
    INCOMPLETE_ACTION = "INCOMPLETE_ACTION",
    NO_ACCOUNTS = "NO_ACCOUNTS",
    WINDOW_CLOSED = "WINDOW_CLOSED",
    USER_CANCELLED = "USER_CANCELLED",
    POPUP_WINDOW_REFUSED = "POPUP_WINDOW_REFUSED",
    POPUP_WINDOW_OPEN_FAILED = "POPUP_WINDOW_OPEN_FAILED"
}
export declare function getExternalActionErrorMessageForEndTag(tag: string | EDappActionErrorTag): string;
