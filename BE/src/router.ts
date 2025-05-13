import { Request, Response, Router } from "express";
import AuthRouters from "./routes/auth/main.routes";
import UserRouters from "./routes/user/main.routes";
import ItemRouters from "./routes/commerce/item.routes";
import CategoryRouters from "./routes/commerce/category.routes";
import AddressRouters from "./routes/user/address.routes";
import AuthPayment from "./routes/commerce/payment.routes";
import DraftItem from "./routes/commerce/draftItem.routes";
import ReviewRouters from "./routes/commerce/review.routes";
import WishlistRouters from "./routes/commerce/wishlist.routes";
const router = Router();

router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

router.use("/auth", AuthRouters);
router.use("/user", UserRouters);
router.use("/item/draft", DraftItem);
router.use("/item", ItemRouters);
router.use("/item/review", ReviewRouters);
router.use("/item/wishlist", WishlistRouters);
router.use("/address", AddressRouters);
router.use("/categories", CategoryRouters);
router.use("/payment", AuthPayment);

export default router;
