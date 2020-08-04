import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('uther@blizzard.com');
  });

  it("shouldn't be able to create a user with a previously used email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    expect(
      createUserService.execute({
        name: 'Jaina Proudmore',
        email: 'uther@blizzard.com',
        password: 'arthashasaheart',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
