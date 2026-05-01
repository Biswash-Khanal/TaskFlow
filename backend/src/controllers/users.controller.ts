import { NextFunction, Request, Response } from "express";
import { fetchAllUsers } from "../services/users.services";
import { ResponseHelper } from "../utils/ResponseHelpers";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await fetchAllUsers();
    return ResponseHelper.success.found(
      res,
      users,
      "Users Found Successfully!",
    );
  } catch (error) {
    next(error);
  }
}
export async function postUser(req: Request, res: Response) {
  return res.json({ message: "You hit the postUser function" });
}
export async function deleteUser(req: Request, res: Response) {
  return res.json({ message: "You hit the deleteuser function" });
}
