export const ALL_FOOD_ID = "AllFood";

export const API_PATH =
    process.env.NODE_ENV === "production"
        ? "/api"
        : "http://localhost:3000/api";

export const WINDOW_WIDTH_SHOW_SIDEBAR_SIZE = 1000;
export const MIN_ITEM_HEIGHT = 100;

export const VERBOSE_INFO =
    !!process.env.VERBOSE || process.env.NODE_ENV !== "production";
export const VERBOSE_ERROR = true || process.env.NODE_ENV !== "production";

const WHITE = "#ffffff";

export const LIST_BACKGROUNDCOLOR = "#ededed";
export const LIST_BACKGROUNDCOLOR_DRAGGING = "#f4fff4";
export const ITEM_BACKGROUNDCOLOR = WHITE;
export const ITEM_BACKGROUNDCOLOR_HOVER = "#f5f5f5";
export const BACKGROUND_CURRENT_DAY = "#fff9f9";
export const BACKGROUND_DAY = WHITE;

export const POLLING_TIMEOUT = 30 * 1000;
