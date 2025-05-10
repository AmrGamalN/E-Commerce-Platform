import { Request, Response, Router } from "express";
import AuthRouters from "./routes/auth/main.routes";
import UserRouters from "./routes/user/main.routes";
import ItemRouters from "./routes/commerce/item.routes";
import CategoryRouters from "./routes/commerce/category.routes";
import AddressRouters from "./routes/user/address.routes";
import AuthPayment from "./routes/commerce/payment.routes";
import DraftItem from "./routes/commerce/draftItem.routes";
const router = Router();

// Health Check
router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

// Routes
router.use("/auth", AuthRouters);
router.use("/user", UserRouters);
router.use("/item/draft", DraftItem);
router.use("/item", ItemRouters);
router.use("/address", AddressRouters);
router.use("/categories", CategoryRouters);
router.use("/payment", AuthPayment);

export default router;
