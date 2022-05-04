import { Request, Response } from "express";

import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoryService();

    //executando serciço
    const category = await listCategoryService.execute();

    //respondendo em forma de json
    return res.json(category);
  }
}

export { ListCategoryController };
