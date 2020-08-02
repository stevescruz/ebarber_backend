import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect combination of email and password.', 401);
    }

    const checkPasswordMatch = await compare(password, user.password);

    if (!checkPasswordMatch) {
      throw new AppError('Incorrect combination of email and password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
export default AuthenticateUserService;
