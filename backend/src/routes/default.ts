import { Router } from "express";

const defaultRoute = Router();

defaultRoute.get("/", (_, res) => {
    res.status(200).send("Essensplaner API");
});

export default defaultRoute;
