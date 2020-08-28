import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('The user should be able to reset his password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    const { token } = await fakeUserTokensRepository.generateUserToken(user.id);

    await resetPasswordService.execute({ token, password: 'scourge' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('scourge');
  });

  it("Should hash the user's new password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generateUserToken(user.id);

    await resetPasswordService.execute({ token, password: 'scourge' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('scourge');
    expect(updatedUser?.password).toBe('scourge');
  });
});
