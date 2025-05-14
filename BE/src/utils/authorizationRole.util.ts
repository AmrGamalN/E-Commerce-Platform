import AuthenticationMiddleware from "../middlewares/authentication.middleware";
const authMiddleware = AuthenticationMiddleware.getInstance();

export const userAuthorizationMiddlewares = [
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin", "manager"]),
];

export const adminAuthorizationMiddlewares = [
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin", "manager"]),
];
