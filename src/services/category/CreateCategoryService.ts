import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === "" || name === null) {
      throw new Error("Name invalid");
    }

    //category vem do controller
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name.toLowerCase(),
      },
    });

    //Verificando se a categoria ja existe
    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    const category = await prismaClient.category.create({
      data: {
        name: name.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}

export { CreateCategoryService };
