import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AddItemController } from "./controllers/order/AddItemController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
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

//Criando itens
router.post("/order/add", isAuthenticated, new AddItemController().handle);

//Removendo item
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);

//enviando pedido
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

//Pedidos
router.get("/orders", isAuthenticated, new ListOrderController().handle);

//Detalhes do pedido
router.get(
  "/orders/details",
  isAuthenticated,
  new DetailOrderController().handle
);

//Finalizar pedido
router.put(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);
export { router };
