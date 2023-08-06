import { Router } from "express";
import foodRoute from "./food";
import defaultRoute from "./default";

const router = Router();

router.use("/", defaultRoute);
router.use("/food", foodRoute);

export default router;
