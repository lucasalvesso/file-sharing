import { handler } from "./app/main";
import bodyParser from "body-parser";
import express from "express";
import { Routes } from "./app/Routes";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();
const port = 8005;

app.use(bodyParser.json());

app.get("/", async (req: any, res: any) => {
  await handler(req);
  res.send();
});

Routes(app);

const server = () => {
  app.listen(port, () => {
    console.log("Servidor executando na porta ", port);
  });
};

server();
