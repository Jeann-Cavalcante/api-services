import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prismaClient from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuario incorreto");
    }

    //Verificar se a senha esta correta e comparar a criptografia
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuario incorreto");
    }

    //Gerar um token jwt e devolver os dados do usuario comi id, name e email
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET, // desativado tsconfig ("strict": false) linha 77
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
