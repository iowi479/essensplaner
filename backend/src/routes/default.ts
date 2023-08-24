import { Router } from "express";
import { logger } from "../utils/logging";

const defaultRoute = Router();

defaultRoute.get("/", (_, res) => {
    logger.accessed("/");
    res.status(200).send("Essensplaner API");
});

export default defaultRoute;
