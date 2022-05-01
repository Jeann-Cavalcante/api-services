import { Request, Response, Router } from "express";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

const router = Router();

//cadastro
router.post("/users", new CreateUserController().handle);
//Login
router.post("/session", new AuthUserController().handle);
//Usuario logado
router.get("/me", new DetailUserController().handle);

export { router };
