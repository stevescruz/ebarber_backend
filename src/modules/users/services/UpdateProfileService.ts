import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashRepository')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(`The user was not found.`, 401);
    }

    const { id: findEmailOwner } =
      (await this.usersRepository.findByEmail(email)) || {};

    if (typeof findEmailOwner !== 'undefined' && findEmailOwner !== user_id) {
      throw new AppError(`This email cannot be used.`, 401);
    }

    user.name = name;
    user.email = email;

    if (password) {
      user.password = password;
    }

    return this.usersRepository.save(user);
  }
}
