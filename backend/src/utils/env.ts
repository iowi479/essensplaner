const STORAGE_PATH = process.env["ESSENSPLANER_STORAGE_PATH"] || "../temp/";
export const ALL_FOODS_FILE = STORAGE_PATH + "all_foods.json";
export const FOOD_DAYS_FILE = STORAGE_PATH + "food_days.json";

export const HOST = process.env["ESSENSPLANER_HOST"] || "localhost";
const PORT_ENV = parseInt(process.env["ESSENSPLANER_PORT"] || "");
export const PORT = Number.isInteger(PORT_ENV) ? PORT_ENV : 3001;
export const API_PATH = process.env["ESSENSPLANER_API_PATH"] || "/api";

export const INITIAL_FOOD_ITEMS = 2;
export const PREVIOUS_DAYS = 2;
export const FOLLOWING_DAYS = 14;
