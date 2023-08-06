export const ALL_FOOD_ID = "AllFood";

const BACKEND_PORT_ENV = parseInt(process.env["REACT_APP_BACKEND_PORT"] || "1");
const BACKEND_PORT = Number.isInteger(BACKEND_PORT_ENV)
    ? BACKEND_PORT_ENV
    : 3001;
const BACKEND_HOST = process.env["REACT_APP_BACKEND_HOST"] || "localhost";
const BACKEND_PATH = process.env["REACT_APP_BACKEND_PATH"] || "";

export const BACKEND = `http://${BACKEND_HOST}:${BACKEND_PORT}${BACKEND_PATH}`;

export const WINDOW_WIDTH_SHOW_SIDEBAR_SIZE = 1000;
export const MIN_ITEM_HEIGHT = 100;

const WHITE = "#ffffff";

export const LIST_BACKGROUNDCOLOR = "#ededed";
export const LIST_BACKGROUNDCOLOR_DRAGGING = "#f4fff4";
export const ITEM_BACKGROUNDCOLOR = WHITE;
export const ITEM_BACKGROUNDCOLOR_HOVER = "#f5f5f5";
export const BACKGROUND_CURRENT_DAY = "#fff9f9";
export const BACKGROUND_DAY = WHITE;
