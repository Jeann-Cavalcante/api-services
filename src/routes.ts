import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListbyCategoryController } from "./controllers/product/ListbyCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

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
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

//Listando produto
router.get(
  "/category/product",
  isAuthenticated,
  new ListbyCategoryController().handle
);

//-- ROTAS ORDER --
// Criando mesas
router.post("/order", isAuthenticated, new CreateOrderController().handle);

//Deletando order
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

export { router };
