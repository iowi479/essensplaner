import { existsSync, readFileSync, writeFile } from "fs";
import { getFoodList, getItems } from "../fakeItems";
import { Food, FoodDay, jsonToFoodDays } from "../types/FoodTypes";
import {
    ALL_FOODS_FILE,
    FOLLOWING_DAYS,
    FOOD_DAYS_FILE,
    INITIAL_FOOD_ITEMS,
    PREVIOUS_DAYS,
} from "./env";

let CURRENT_ALL_FOODS_DATA: string | undefined = undefined;
let CURRENT_FOOD_DAYS_DATA: string | undefined = undefined;

export const writeAllFoods = (allFoods: Food[]): void => {
    CURRENT_ALL_FOODS_DATA = JSON.stringify(allFoods);
    writeFile(
        ALL_FOODS_FILE,
        CURRENT_ALL_FOODS_DATA,
        { encoding: "utf8", flag: "w" },
        (err) => {
            if (err) {
                console.error("error while posting:", err);
                return;
            }
        }
    );
};

export const writeFoodDays = (foodDays: FoodDay[]): void => {
    CURRENT_FOOD_DAYS_DATA = JSON.stringify(foodDays);
    writeFile(
        FOOD_DAYS_FILE,
        CURRENT_FOOD_DAYS_DATA,
        { encoding: "utf8", flag: "w" },
        (err) => {
            if (err) {
                console.error("error while posting:", err);
                return;
            }
        }
    );
};

export const readAllFoods = (): string => {
    if (!CURRENT_ALL_FOODS_DATA) {
        if (existsSync(ALL_FOODS_FILE)) {
            const data = readFileSync(ALL_FOODS_FILE);
            CURRENT_ALL_FOODS_DATA = data.toString() || "[]";
        } else {
            CURRENT_ALL_FOODS_DATA = JSON.stringify(
                getItems(INITIAL_FOOD_ITEMS)
            );

            writeFile(
                ALL_FOODS_FILE,
                CURRENT_ALL_FOODS_DATA,
                { encoding: "utf-8" },
                (err) => {
                    if (err) {
                        console.error("error while created nonexistant: ", err);
                        return;
                    }
                }
            );
        }
    }
    return CURRENT_ALL_FOODS_DATA;
};

export const readFoodDays = (): string => {
    if (!CURRENT_FOOD_DAYS_DATA) {
        if (existsSync(FOOD_DAYS_FILE)) {
            const data = readFileSync(FOOD_DAYS_FILE);

            const days: FoodDay[] = jsonToFoodDays(JSON.parse(data.toString()));

            const empty = getFoodList(2, 14);
            for (let i = 0; i < empty.length; i++) {
                for (let j = 0; j < days.length; j++) {
                    if (sameDay(empty[i]!, days[j]!)) {
                        empty[i] = { ...empty[i], ...days[j] } as FoodDay;
                    }
                }
            }
            CURRENT_FOOD_DAYS_DATA = JSON.stringify(empty) || "[]";
        } else {
            CURRENT_FOOD_DAYS_DATA = JSON.stringify(
                getFoodList(PREVIOUS_DAYS, FOLLOWING_DAYS)
            );

            writeFile(
                FOOD_DAYS_FILE,
                CURRENT_FOOD_DAYS_DATA,
                { encoding: "utf-8" },
                (err) => {
                    if (err) {
                        console.error("error while created nonexistant: ", err);
                        console.error(err);
                        return;
                    }
                }
            );
        }
    }
    return CURRENT_FOOD_DAYS_DATA;
};

const sameDay = (foodDay1: FoodDay, foodDay2: FoodDay): boolean => {
    if (foodDay1.day.getDate() === foodDay2.day.getDate()) {
        if (foodDay1.day.getMonth() === foodDay2.day.getMonth()) {
            if (foodDay1.day.getFullYear() === foodDay2.day.getFullYear()) {
                return true;
            }
        }
    }
    return false;
};

export const preLoadData = (): void => {
    readAllFoods();
    readFoodDays();
};
