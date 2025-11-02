import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { createProjectController } from "../controller/project.controller";

const router = Router();

router.use(AuthMiddleware);
router.post("/new", createProjectController)

export default router;