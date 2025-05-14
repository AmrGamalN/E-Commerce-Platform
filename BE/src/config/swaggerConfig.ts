import { Application, NextFunction, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const swaggerOptions = (route: string): object => {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E-commerce-platform",
        version: "1.0.0",
        description: "API documentation for the platform",
      },
      servers: [
        {
          url: process.env.BACKEND_URL,
        },
      ],
    },
    apis: [
      `./src/routes/${route}/*.ts`,
      `./src/swaggers/components/${route}.component.ts`,
      `./src/swaggers/responses/${route}.response.ts`,
      `./src/swaggers/tags/${route}.tag.ts`,
      `./src/swaggers/parameters/*.ts`,
      `./src/swaggers/queries/*.ts`,
    ],
  };
};

export const swaggerSpec = (app: Application) => {
  app.use("/api-docs/:routeName", swaggerUi.serve);
  app.use(
    "/api-docs/:routeName",
    (req: Request, res: Response, next: NextFunction) => {
      const routeName = req.params.routeName;
      const swaggerSpecs = swaggerJSDoc(swaggerOptions(routeName));
      return swaggerUi.setup(swaggerSpecs, { explorer: true })(req, res, next);
    }
  );
};

export default swaggerOptions;
