import { Food, FoodDay, jsonToFoodDays } from "../types/FoodTypes";
import { BACKEND } from "../utils/env";

export const fetchAllFoods = async (): Promise<Food[]> => {
    const req = await fetch(BACKEND + "/food/all");
    return await req.json();
};

export const fetchFoodDays = async (): Promise<FoodDay[]> => {
    const req = await fetch(BACKEND + "/food/days");
    const result = await req.json();
    return jsonToFoodDays(result);
};

export const postAllFoodsUpdate = (allFoods: Food[]) => {
    const requestOptions = {
        method: "POST",
        headers: { "content-type": "application/json;charset=utf-8" },
        body: JSON.stringify(allFoods),
    };

    fetch(BACKEND + "/food/all", requestOptions).catch((err) =>
        console.error("post all foods: ", err)
    );
};

export const postFoodDaysUpdate = (foodDays: FoodDay[]) => {
    const requestOptions = {
        method: "POST",
        headers: { "content-type": "application/json;charset=utf-8" },
        body: JSON.stringify(foodDays),
    };

    fetch(BACKEND + "/food/days", requestOptions).catch((err) => {
        console.error("post food days: ", err);
    });
};
