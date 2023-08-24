import { Router } from "express";
import { Food, FoodDay } from "../types/FoodTypes";
import {
    readAllFoods,
    readFoodDays,
    writeAllFoods,
    writeFoodDays,
} from "../utils/storage";
import { logger } from "../utils/logging";

const foodRoute = Router();

foodRoute.get("/all", (_, res) => {
    logger.accessed("/food/all");
    res.status(200).send(readAllFoods());
});

foodRoute.get("/days", (_, res) => {
    logger.accessed("/food/days");
    res.status(200).send(readFoodDays());
});

foodRoute.post("/all", (req, res) => {
    logger.posted("/food/all");
    try {
        const data = req.body as Food[];
        writeAllFoods(data);
        res.sendStatus(200);
    } catch {
        logger.error("/food/all post failed");
        res.sendStatus(400);
    }
});

foodRoute.post("/days", (req, res) => {
    logger.posted("/food/all");
    try {
        const data = req.body as FoodDay[];
        writeFoodDays(data);
        res.sendStatus(200);
    } catch {
        logger.error("/food/days post failed");
        res.sendStatus(400);
    }
});

export default foodRoute;
