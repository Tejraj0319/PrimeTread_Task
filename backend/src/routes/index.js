import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/tasks/task.routes.js";

const router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/tasks", taskRoutes);

export default router;
