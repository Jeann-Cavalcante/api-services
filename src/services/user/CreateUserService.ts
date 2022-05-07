import { hash } from "bcryptjs";

import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //Verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorrect");
    }

    // verificar se email já existe na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    //Criptografando a senha
    const passwordHash = await hash(password, 8);

    //Registrando usuario
    const user = await prismaClient.user.create({
      data: {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: passwordHash,
      },
      //selecionando o que devolver
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
