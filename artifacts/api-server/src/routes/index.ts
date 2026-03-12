import { Router, type IRouter } from "express";
import healthRouter from "./health";
import machinesRouter from "./machines";
import toolsRouter from "./tools";
import servicesRouter from "./services";
import galleryRouter from "./gallery";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/machines", machinesRouter);
router.use("/tools", toolsRouter);
router.use("/services", servicesRouter);
router.use("/gallery", galleryRouter);
router.use("/contact", contactRouter);

export default router;
