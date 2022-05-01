import { NextFunction, Request, Response } from "express";
import { DatailUserService } from "../../services/user/DatailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const datailUserService = new DatailUserService();

    const user = await datailUserService.execute();

    return res.json(user);
  }
}

export { DetailUserController };
