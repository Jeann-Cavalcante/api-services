import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //pegar token
  const authToken = req.headers.authorization;

  //verificar se token esta vazio
  if (!authToken) {
    return res.status(401).end();
  }

  //separando Bearer do token
  const [, token] = authToken.split(" ");

  try {
    //Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub; // @types - criado tipo - tsconfig linha33
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
