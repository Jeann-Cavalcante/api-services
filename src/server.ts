import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";

import { router } from "./routes";

import "express-async-errors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

//rota de foto
app.use("/file", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
});
