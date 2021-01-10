import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all users that are registered service providers.', async () => {
    const users = [];

    users.push(
      await fakeUsersRepository.create({
        name: 'Uther the Lightbringer',
        email: 'uther@blizzard.com',
        password: 'silverorder',
      }),
    );

    users.push(
      await fakeUsersRepository.create({
        name: 'Arthas Menethil',
        email: 'arthas@blizzard.com',
        password: 'jaina',
      }),
    );

    const providers = await listProvidersService.execute({});

    expect(providers).toEqual(users);
  });

  it('should not be able to list yourself as a service provider.', async () => {
    const users = [];

    const loggedUser = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    users.push(
      await fakeUsersRepository.create({
        name: 'Arthas Menethil',
        email: 'arthas@blizzard.com',
        password: 'jaina',
      }),
    );

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual(users);
  });
});
