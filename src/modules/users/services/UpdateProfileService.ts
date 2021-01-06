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
  new_password?: string;
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
    new_password,
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

    if ((new_password && !old_password) || (!new_password && old_password)) {
      throw new AppError(
        `You cannot update the password without informing both the old password and the new password`,
        401,
      );
    }

    if (new_password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Incorrect password.', 401);
      }

      user.password = await this.hashProvider.generateHash(new_password);
    }

    return this.usersRepository.save(user);
  }
}
