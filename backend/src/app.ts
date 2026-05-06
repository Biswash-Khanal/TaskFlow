import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req: Request, res: Response) =>
  res.send(`
  <h1>Hi Welcome to the TaskFlow API</h1>
  `),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
