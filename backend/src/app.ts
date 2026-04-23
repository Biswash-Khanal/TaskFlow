import express from "express";
import logger from "./middleware/logger";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(logger); // custom middleware
app.use("/api", routes);
app.use(errorHandler);

export default app;
