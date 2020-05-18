import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.findOne({ email });
    return findUser || null;
  }
}

export default UsersRepository;
