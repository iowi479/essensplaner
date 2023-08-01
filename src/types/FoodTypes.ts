export interface Food {
    id: string;
    databaseId: number;
    name: string;
    tags: string[];
}

export interface FoodDay {
    id: number;
    day: Date;
    noon: Food[];
    evening: Food[];
}

export type DayColumns = "noon" | "evening";

export interface FoodDayJson extends Omit<FoodDay, "day"> {
    day: string;
}

export const jsonToFoodDays = (jsonArray: any[]): FoodDay[] => {
    const days: FoodDay[] = [];
    const json: FoodDayJson[] = jsonArray;

    json.map((e) => {
        days.push({
            ...e,
            day: new Date(e.day),
        });
    });

    return days;
};
