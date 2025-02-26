import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectionDB } from "./database/connection";
import cors from "cors";
import applyMiddlewares from "./middleware/middleware";

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  app.use(applyMiddlewares());
  app.use(cors());

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.json("Hello, Express with TypeScript!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

Promise.all([connectionDB()])
  .then(async () => await start())
  .catch((err) => console.log(err));
