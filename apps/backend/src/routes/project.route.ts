import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { chatWithProjectController, createProjectController } from "../controller/project.controller";

const router = Router();

router.use(AuthMiddleware);
router.post("/new", createProjectController)
router.post("/chat/:slug", chatWithProjectController)

export default router;