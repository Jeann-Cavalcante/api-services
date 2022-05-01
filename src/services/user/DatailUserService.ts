import prismaClient from "../../prisma";

class DatailUserService {
  async execute(user_id: string) {
    // buscando no banco pelo id
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      //Select dos dados que virão do banco
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { DatailUserService };
