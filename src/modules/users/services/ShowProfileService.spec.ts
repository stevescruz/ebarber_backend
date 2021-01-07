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

    const showUser = await showProfileService.execute({ user_id: user.id });

    expect(showUser.id).toBe(user.id);
    expect(showUser.name).toBe(user.name);
    expect(showUser.email).toBe(user.email);
    expect(showUser.avatar).toBe(user.avatar);
  });

  it('should not be able to use a user_id that does not belong to any user.', async () => {
    await expect(
      showProfileService.execute({
        user_id: '01152646-4f19-11eb-ae93-0242ac130002',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
