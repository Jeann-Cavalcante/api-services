import prismaClient from "../../prisma";

class ListCategoryService {
  async execute() {
    const list = await prismaClient.category.findMany();
  }
}

export { ListCategoryService };
