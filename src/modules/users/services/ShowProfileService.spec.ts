import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it("it should be able to return a user's profile.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.id).toBe(user.id);
    expect(profile.name).toBe(user.name);
    expect(profile.email).toBe(user.email);
    expect(profile.avatar).toBe(user.avatar);
  });

  it('should not be able to use a user_id that does not belong to any user.', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'nonexistent-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
