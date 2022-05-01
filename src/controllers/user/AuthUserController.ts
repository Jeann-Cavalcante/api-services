import { Request, Response } from "express";

import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    //pegando usuario e senha
    const { email, password } = req.body;

    //chamando serviço
    const authUserService = new AuthUserService();

    //executando serviço
    const auth = await authUserService.execute({
      email,
      password,
    });
    return res.json(auth);
  }
}

export { AuthUserController };
