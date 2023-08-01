import { DraggableLocation } from "react-beautiful-dnd";
import { Food, FoodDay } from "../../types/FoodTypes";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

export const reorder = (
    list: Food[],
    startIndex: number,
    endIndex: number
): Food[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const copy = (
    allFoods: Food[],
    day: FoodDay,
    column: "noon" | "evening",
    source: DraggableLocation,
    destination: DraggableLocation
) => {
    const item = allFoods[source.index];
    const result = Array.from(day[column]);
    result.splice(destination.index, 0, { ...item, id: uuidv4() });
    return { ...day, [column]: result };
};

export const move = (
    source: Food[],
    destination: Food[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
): void => {
    const [removed] = source.splice(droppableSource.index, 1);
    destination.splice(droppableDestination.index, 0, removed);
};

export const remove = (
    day: FoodDay,
    column: "noon" | "evening",
    index: number
): FoodDay => {
    const result = Array.from(day[column]);
    result.splice(index, 1);
    return { ...day, [column]: result };
};

export const scrollToToday = () => {
    const element = document.getElementById("today");
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};
