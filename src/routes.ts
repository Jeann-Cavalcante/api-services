import { Request, Response, Router } from "express";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//cadastro
router.post("/users", new CreateUserController().handle);
//Login
router.post("/session", new AuthUserController().handle);
//Usuario logado
router.get("/me", isAuthenticated, new DetailUserController().handle);

export { router };
