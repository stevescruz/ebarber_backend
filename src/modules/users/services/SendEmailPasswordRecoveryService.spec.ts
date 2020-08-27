import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import SendEmailPasswordRecoveryService from '@modules/users/services/SendEmailPasswordRecoveryService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendEmailPasswordRecoveryService: SendEmailPasswordRecoveryService;

describe('SendEmailPasswordRecoveryService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendEmailPasswordRecoveryService = new SendEmailPasswordRecoveryService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('The user should be able to recover his password by informing his email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    await sendEmailPasswordRecoveryService.execute({
      email: 'uther@blizzard.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it("The user shouldn't be able to recover his password by informing a non-existent email.", async () => {
    await expect(
      sendEmailPasswordRecoveryService.execute({
        email: 'uther@blizzard.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a user token for password recovery', async () => {
    const generateUserToken = jest.spyOn(
      fakeUserTokensRepository,
      'generateUserToken',
    );

    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    await sendEmailPasswordRecoveryService.execute({ email: user.email });

    expect(generateUserToken).toBeCalledWith(user.id);
  });
});
