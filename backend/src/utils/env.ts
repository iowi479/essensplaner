const STORAGE_PATH =
    process.env["NODE_ENV"] === "production"
        ? "/usr/essensplaner/storage/"
        : "../tmp/";
export const ALL_FOODS_FILE = STORAGE_PATH + "all_foods.json";
export const FOOD_DAYS_FILE = STORAGE_PATH + "food_days.json";

export const VERBOSE_INFO = true;
export const VERBOSE_ERROR = true;
export const VERBOSE_OBJECTS = process.env["NODE_ENV"] !== "production";

export const PORT = 3000;
export const API_PATH = "/api";

export const INITIAL_FOOD_ITEMS = 2;
export const PREVIOUS_DAYS = 10;
export const FOLLOWING_DAYS = 14;
