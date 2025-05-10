import { Router } from "express";
import UserRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import SecurityRoutes from "./security.routes";
const router = Router();

router.use("/", UserRoutes);
router.use("/profile", profileRoutes);
router.use("/security", SecurityRoutes);

export default router;
