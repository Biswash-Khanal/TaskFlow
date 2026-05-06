import app from "./app";
import { NextFunction, Request, Response } from "express";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
