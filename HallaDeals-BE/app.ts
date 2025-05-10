import express, { Application } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./src/config/mongoDBConnect";
import router from "./src/router";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/config/swaggerConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { redisClient } from "./src/config/redisConfig";
import { errorMiddleware } from "./src/middlewares/handleError";
import helmet from "helmet";
const xssClean = require("xss-clean");
dotenv.config();

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const app: Application = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://halla-deals-1dytz4glq-halla-deals-projects.vercel.app",
    "http://16.24.17.47",
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

// Error handle middleware
app.use(errorMiddleware);

Promise.all([connectToMongoDB(), redisClient.connect()])
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Express server started on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });

export default app;
