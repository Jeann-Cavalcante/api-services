import { Request, Response } from "express";

import { ListbyCategoryService } from "../../services/product/ListbyCategoryService";

class ListbyCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listbyCategory = new ListbyCategoryService();

    const products = await listbyCategory.execute({ category_id });

    return res.json(products);
  }
}

export { ListbyCategoryController };
