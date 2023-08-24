import { Food, FoodDay } from "./types/FoodTypes";
import { v4 as uuidv4 } from "uuid";

export const getItems = (count: number, offset: number = 0): Food[] => {
    const foodList: Food[] = [];

    for (let i = 0; i < count; i++) {
        const element: Food = {
            id: uuidv4(),
            databaseId: i + offset,
            name: `Essen ${i + offset + 1}`,
            tags: [],
        };
        foodList.push(element);
    }

    return foodList;
};

export const getFoodList = (previousDays: number, days: number): FoodDay[] => {
    const list: FoodDay[] = [];
    const today = new Date();

    for (let i = 0; i < previousDays + days; i++) {
        const currDate = new Date();
        currDate.setUTCDate(today.getUTCDate() - previousDays + i);
        const day: FoodDay = {
            id: idFromDate(currDate),
            day: currDate,
            noon: [],
            work: [],
            evening: [],
        };

        list.push(day);
    }

    return list;
};

export const idFromDate = (date: Date): number => {
    return 2023 * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
};
