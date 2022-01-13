import { Router } from "express";
import starShipRouter from "./starShip.route";

const router = Router();

router.use("/starShip", starShipRouter);

export default router;
