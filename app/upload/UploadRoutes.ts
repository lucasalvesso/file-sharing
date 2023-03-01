import { Application } from "express";
import { handler as GetS3UrlResource } from "./controller/GetS3UrlResource";
import { handler as GetFileUrlUseCase } from "./controller/GetFileUrlResource";

export const UploadRoutes = (app: Application) => {
  app.post("/upload", async (req, res) => {
    res.send(await GetS3UrlResource());
  });

  app.get("/upload/:fileKey", async (req, res) => {
    res.send(await GetFileUrlUseCase(req));
  });
};
