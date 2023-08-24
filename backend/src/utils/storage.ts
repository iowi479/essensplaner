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
import { logger } from "./logging";

let CURRENT_ALL_FOODS_DATA: string | undefined = undefined;
let CURRENT_FOOD_DAYS_DATA: string | undefined = undefined;

export const writeAllFoods = (allFoods: Food[]): void => {
    CURRENT_ALL_FOODS_DATA = JSON.stringify(allFoods);

    logger.info("writing allFoods", allFoods);

    writeFile(
        ALL_FOODS_FILE,
        CURRENT_ALL_FOODS_DATA,
        { encoding: "utf8", flag: "w" },
        (err) => {
            if (err) {
                logger.error("writing allFoods", err);
                return;
            }
        }
    );
};

export const writeFoodDays = (foodDays: FoodDay[]): void => {
    CURRENT_FOOD_DAYS_DATA = JSON.stringify(foodDays);

    logger.info("writing foodDays", foodDays);

    writeFile(
        FOOD_DAYS_FILE,
        CURRENT_FOOD_DAYS_DATA,
        { encoding: "utf8", flag: "w" },
        (err) => {
            if (err) {
                logger.error("writing foodDays", err);
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

            logger.info("read allFoods", CURRENT_ALL_FOODS_DATA);
        } else {
            const items = getItems(INITIAL_FOOD_ITEMS);
            CURRENT_ALL_FOODS_DATA = JSON.stringify(items);

            logger.info("creating and writing allFoods", items);

            writeFile(
                ALL_FOODS_FILE,
                CURRENT_ALL_FOODS_DATA,
                { encoding: "utf-8" },
                (err) => {
                    if (err) {
                        logger.error("creating and writing allFoods", err);
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

            logger.info("read foodDays", days);
            logger.info("processing foodDays...");

            const empty = getFoodList(2, 14);
            for (let i = 0; i < empty.length; i++) {
                for (let j = 0; j < days.length; j++) {
                    if (sameDay(empty[i]!, days[j]!)) {
                        empty[i] = { ...empty[i], ...days[j] } as FoodDay;
                    }
                }
            }
            CURRENT_FOOD_DAYS_DATA = JSON.stringify(empty) || "[]";

            logger.info("processed foodDays", empty);
        } else {
            const items = getFoodList(PREVIOUS_DAYS, FOLLOWING_DAYS);
            CURRENT_FOOD_DAYS_DATA = JSON.stringify(items);

            logger.info("creating and writing allFoods", items);

            writeFile(
                FOOD_DAYS_FILE,
                CURRENT_FOOD_DAYS_DATA,
                { encoding: "utf-8" },
                (err) => {
                    if (err) {
                        logger.error("creating and writing foodDays", err);
                        return;
                    }
                }
            );
        }
    }
    return CURRENT_FOOD_DAYS_DATA;
};

const sameDay = (foodDay1: FoodDay, foodDay2: FoodDay): boolean => {
    return (
        foodDay1.day.toLocaleDateString() === foodDay2.day.toLocaleDateString()
    );
};

export const preLoadData = (): void => {
    readAllFoods();
    readFoodDays();
};
