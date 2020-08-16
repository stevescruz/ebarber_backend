import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendEmailPasswordResetService from '@modules/users/services/SendEmailPasswordResetService';

describe('SendEmailPasswordRestService', () => {
  it('The user should be able to retrieve his password by informing his email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmailPasswordResetService = new SendEmailPasswordResetService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    await sendEmailPasswordResetService.execute({
      email: 'uther@blizzard.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
