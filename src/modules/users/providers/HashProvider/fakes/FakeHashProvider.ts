import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }
}
