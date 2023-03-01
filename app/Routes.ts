import { Application } from "express";
import { UploadRoutes } from "./upload/UploadRoutes";

export const Routes = (app: Application) => {
  UploadRoutes(app);
};
