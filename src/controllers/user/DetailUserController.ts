import { NextFunction, Request, Response } from "express";

import { DatailUserService } from "../../services/user/DatailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    //Pegando id
    const user_id = req.user_id;

    const datailUserService = new DatailUserService();

    const user = await datailUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
