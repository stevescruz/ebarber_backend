import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendEmail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

// NOTE: this does nothing for now.
