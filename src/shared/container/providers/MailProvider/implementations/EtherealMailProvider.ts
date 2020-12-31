import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import Mail from 'nodemailer/lib/mailer';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendEmail({ to, from, subject }: ISendMailDTO): Promise<void> {
    const mailOptions: Mail.Options = {
      from: {
        name: from?.name || 'eBarber Team',
        address: from?.email || 'team@ebarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: 'test',
    };

    const message = await this.client.sendMail(mailOptions);

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
