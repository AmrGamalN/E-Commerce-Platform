import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./src/config/mongoDBConnect";
import router from "./src/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { redisClient } from "./src/config/redisConfig";
import { errorMiddleware } from "./src/middlewares/handleError.middleware";
import helmet from "helmet";
import { swaggerSpec } from "./src/config/swaggerConfig";
const xssClean = require("xss-clean");
dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://e-commerce-platform-woad.vercel.app",
    "https://e-commerce-platform-git-main-amr-gamals-projects-5f0c02d5.vercel.app",
    "https://e-commerce-platform-5jiucuv86-amr-gamals-projects-5f0c02d5.vercel.app",
    String(process.env.FRONTEND_URL),
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());
app.use(xssClean());

swaggerSpec(app);
app.use("/api", router);

const PORT = process.env.PORT || 8080;
Promise.all([connectToMongoDB(), redisClient.connect()])
  .then(async () => {
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: "Page not found" });
    });
    app.use(errorMiddleware);
    app.listen(PORT, () => {
      console.log(`Express server started on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });

export default app;
