import { handler } from "./app/main";
import bodyParser from "body-parser";
import express from "express";
import { Routes } from "./app/Routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: express.Application = express();
const port = 8005;

app.use(
  cors({
    origin: ["http://localhost:8081"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["*"],
  })
);

app.use(bodyParser.json());

app.get("/", async (req: any, res: any) => {
  await handler(req);
  res.send({ message: "server funcionando" });
});

Routes(app);

const server = () => {
  app.listen(port, () => {
    console.log("Servidor executando na porta ", port);
  });
};

server();
