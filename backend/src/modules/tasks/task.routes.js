import { Router } from "express";
// import { authMiddleware } from "../auth/auth.middleware.js"
import { create, list, view, update, remove } from "./task.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.use(protect);

router.post("/", create);
router.get("/", list);
router.get("/:id", view);
router.put("/:id", update);
router.delete("/:id", authorizeRoles("ADMIN"), remove);

export default router;
