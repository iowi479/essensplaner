import { Food, FoodDay, jsonToFoodDays } from "../types/FoodTypes";

export const fetchAllFoods = async (): Promise<Food[]> => {
    const req = await fetch("http://localhost:3001/food/all");
    return await req.json();
};

export const fetchFoodDays = async (): Promise<FoodDay[]> => {
    const req = await fetch("http://localhost:3001/food/days");
    const result = await req.json();
    return jsonToFoodDays(result);
};

export const postAllFoodsUpdate = (allFoods: Food[]) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allFoods),
    };

    fetch("http://localhost:3001/food/all", requestOptions).catch((err) =>
        console.error(err)
    );
};

export const postFoodDaysUpdate = (foodDays: FoodDay[]) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodDays),
    };

    fetch("http://localhost:3001/food/days", requestOptions).catch((err) =>
        console.error(err)
    );
};
