import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all users that are registered service providers', async () => {
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

    const serviceProvidersList = await listProvidersService.execute();

    expect(serviceProvidersList).toStrictEqual(users);
  });
});
