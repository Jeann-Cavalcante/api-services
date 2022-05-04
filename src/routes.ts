import { Request, Response, Router } from "express";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//-- ROTAS USER --
//cadastro
router.post("/users", new CreateUserController().handle);
//Login
router.post("/session", new AuthUserController().handle);
//Usuario logado
router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY --
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get(
  "/listCategory",
  isAuthenticated,
  new ListCategoryController().handle
);

export { router };
