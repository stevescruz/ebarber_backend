import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';

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

  it('The user should not be able to reset his password with a non-existent token.', async () => {
    await expect(
      resetPasswordService.execute({
        token: '1c60ed89-a4cb-4c3a-9910-23d2fc5c9f97',
        password: 'scourge',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('The user should not be able to reset his password if he is a non-existent user.', async () => {
    const { token } = await fakeUserTokensRepository.generateUserToken(
      'd06895cc-2488-45a2-8732-51b65d909837',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: 'scourge',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to reset the user's password after 2 hours, when the token expires.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date();

      return date.setSeconds(date.getSeconds() + 7201);
    });

    const { token } = await fakeUserTokensRepository.generateUserToken(user.id);

    await expect(
      resetPasswordService.execute({
        token,
        password: 'scourge',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
