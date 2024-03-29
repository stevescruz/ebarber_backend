import { v4 as uuidv4 } from 'uuid';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  public async generateUserToken(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    } as UserToken);

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(element => element.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
