import { Router } from "express";
import { Food, FoodDay } from "../types/FoodTypes";
import {
    readAllFoods,
    readFoodDays,
    writeAllFoods,
    writeFoodDays,
} from "../utils/storage";

const foodRoute = Router();

foodRoute.get("/all", (_, res) => {
    res.status(200).send(readAllFoods());
});

foodRoute.get("/days", (_, res) => {
    res.status(200).send(readFoodDays());
});

foodRoute.post("/all", (req, res) => {
    try {
        const data = req.body as Food[];
        writeAllFoods(data);
        res.sendStatus(200);
    } catch {
        res.sendStatus(400);
    }
});

foodRoute.post("/days", (req, res) => {
    try {
        const data = req.body as FoodDay[];
        writeFoodDays(data);
        res.sendStatus(200);
    } catch {
        res.sendStatus(400);
    }
});

export default foodRoute;
