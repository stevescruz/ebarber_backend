import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}

// NOTE: this does nothing for now.
