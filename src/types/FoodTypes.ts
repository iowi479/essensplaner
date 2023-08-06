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
    work: Food[];
    evening: Food[];
}

const dayColumns = ["noon", "evening", "work"] as const;
export type DayColumns = (typeof dayColumns)[number];

export interface FoodDayJson extends Omit<FoodDay, "day"> {
    day: string;
}

export const isDayColumn = (s: string): boolean => {
    const result = dayColumns.find((validName) => validName === s);
    return !!result;
};

export const jsonToFoodDays = (jsonArray: any[]): FoodDay[] => {
    const days: FoodDay[] = [];
    const json: FoodDayJson[] = jsonArray;

    json.forEach((e) => {
        days.push({
            ...e,
            day: new Date(e.day),
        });
    });

    return days;
};
