import { v4 as uuidv4 } from "uuid";
import { Food } from "../types/FoodTypes";

const foodIncludes = (food: Food, filters: string[]): boolean => {
    const foodString = food.name.toLowerCase() + food.tags.join().toLowerCase();

    for (let i = 0; i < filters.length; i++) {
        if (filters[i] !== "") {
            if (!foodString.includes(filters[i].toLowerCase())) {
                return false;
            }
        }
    }
    return true;
};

export const filterFoods = (foods: Food[], filters: string[]): Food[] => {
    return foods.filter((food) => foodIncludes(food, filters));
};

export const getTags = (foods: Food[]): string[] => {
    const opts = new Set<string>();

    foods.forEach((f) => {
        f.tags.forEach((tag) => opts.add(tag));
    });

    return Array.from(opts).sort();
};

export const newFood = (id: number): Food => {
    return {
        id: uuidv4(),
        databaseId: id,
        name: "neues Essen",
        tags: [],
    };
};
