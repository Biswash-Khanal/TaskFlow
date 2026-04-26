import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
  return res.json({ message: "You hit the getUser function" });
}
export async function postUser(req: Request, res: Response) {
  return res.json({ message: "You hit the postUser function" });
}
export async function deleteUser(req: Request, res: Response) {
  return res.json({ message: "You hit the deleteuser function" });
}
