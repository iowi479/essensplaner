export const ALL_FOOD_ID = "AllFood";

const PORT_ENV = parseInt(process.env["REACT_APP_PORT"] || "3001");
const BACKEND_PORT = Number.isInteger(PORT_ENV) ? PORT_ENV : 3001;
const HOST = process.env["REACT_APP_HOST"] || "localhost";
const API_PATH = process.env["REACT_APP_API_PATH"] || "/api";

export const BACKEND = `http://${HOST}:${BACKEND_PORT}${API_PATH}`;

export const WINDOW_WIDTH_SHOW_SIDEBAR_SIZE = 1000;
export const MIN_ITEM_HEIGHT = 100;

const WHITE = "#ffffff";

export const LIST_BACKGROUNDCOLOR = "#ededed";
export const LIST_BACKGROUNDCOLOR_DRAGGING = "#f4fff4";
export const ITEM_BACKGROUNDCOLOR = WHITE;
export const ITEM_BACKGROUNDCOLOR_HOVER = "#f5f5f5";
export const BACKGROUND_CURRENT_DAY = "#fff9f9";
export const BACKGROUND_DAY = WHITE;

export const POLLING_TIMEOUT = 30 * 1000;
