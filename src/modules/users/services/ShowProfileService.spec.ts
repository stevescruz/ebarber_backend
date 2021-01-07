import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('it should be able to return a user', async () => {
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
});
