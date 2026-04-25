import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
  return res.json({ message: "You hit the getUser function" });
}
