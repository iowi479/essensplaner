import { format } from "date-fns";
import { DraggableLocation } from "react-beautiful-dnd";
import { DayColumns, FoodDay, isDayColumn } from "../types/FoodTypes";
import { ALL_FOOD_ID } from "./env";

export const idFromDate = (date: Date): number => {
    return 2023 * 10000 + date.getMonth() * 100 + date.getDate();
};

export const droppableIDOf = (foodDay: FoodDay, col: DayColumns): string => {
    const id = idFromDate(foodDay.day);
    return id + "_" + col;
};

export const decodeIDs = (
    source: DraggableLocation,
    destination: DraggableLocation
): {
    sourceDayId: number;
    destDayId: number;
    sourceCol: DayColumns;
    destCol: DayColumns;
} => {
    const [sourceDayIdString, sourceColumn] = source.droppableId.split("_");
    const [destDayIdString, destColumn] = destination.droppableId.split("_");

    if (
        (source.droppableId !== ALL_FOOD_ID && !isDayColumn(sourceColumn)) ||
        (destination.droppableId !== ALL_FOOD_ID && !isDayColumn(destColumn))
    ) {
        console.error("decoding error have to check this. This is braking!!!");
    }
    return {
        sourceDayId: +sourceDayIdString,
        destDayId: +destDayIdString,
        sourceCol: sourceColumn as DayColumns,
        destCol: destColumn as DayColumns,
    };
};

export const formatDate = (day: Date): string => {
    let prefix = "";
    switch (day.getDay()) {
        case 0:
            prefix = "So";
            break;
        case 1:
            prefix = "Mo";
            break;
        case 2:
            prefix = "Di";
            break;
        case 3:
            prefix = "Mi";
            break;
        case 4:
            prefix = "Do";
            break;
        case 5:
            prefix = "Fr";
            break;
        case 6:
            prefix = "Sa";
            break;
        default:
            prefix = "";
    }

    return prefix + format(day, " dd.MM.yyyy");
};

export const isToday = (day: Date): boolean => {
    return new Date().toLocaleDateString() === day.toLocaleDateString();
};
