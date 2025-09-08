import authRouter from "./authRoutes";
import testRouter from "./testRoutes";
import { Router } from "express";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/test", testRouter);

export default appRouter;
