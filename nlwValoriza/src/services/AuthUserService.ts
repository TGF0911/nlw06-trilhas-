import { getCustomRepository } from "typeorm";

import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthRequest{
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password } : IAuthRequest){
    const userRepositories = getCustomRepository(UserRepositories);

    //Verificar se email existe
    const user = await userRepositories.findOne({
      email
    });

    if(!user){
      throw new Error('Email/Password incorrect!');
    }

    //Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      throw new Error('Email/Password incorrect!');
    }

    //Gerar token (secret key: md5 generator)
    const token = sign({
      email: user.email
    }, '21e083270037d0c6df1841beea3804d4', {
      subject: user.id,
      expiresIn: '1d',
    })
    return token;
  }
}