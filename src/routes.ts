import { Router } from "express";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//-- ROTAS USER --
//Cadastro
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
//Lista de categoria
router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- ROTAS PRODUCT --
//Criar produtos
router.post("/product", isAuthenticated, new CreateProductController().handle);

export { router };
