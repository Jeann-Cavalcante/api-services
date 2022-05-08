import { Request, Response } from "express";

import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    const removeItemService = new RemoveItemService();

    const order = await removeItemService.execute({
      id,
    });
    return res.json(order);
  }
}

export { RemoveItemController };
