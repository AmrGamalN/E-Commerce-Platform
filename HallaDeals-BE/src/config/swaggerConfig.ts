const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Halla Deals",
      version: "1.0.0",
      description: "API documentation for the Halla Deals",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.ts",
    "./src/routes/auth/*.ts",
    "./src/routes/user/*.ts",
    "./src/routes/swagger/*.ts",
    "./src/routes/commerce/*.ts",
  ],
};

export default swaggerOptions;
