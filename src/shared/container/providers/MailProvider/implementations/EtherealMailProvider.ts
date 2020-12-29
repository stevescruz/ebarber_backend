import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

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

  public async sendEmail(to: string, body: string): Promise<void> {
    const mailOptions = {
      from: 'eBarber Team <team@ebarber.com>',
      to,
      subject: 'Password recovery',
      text: body,
    };

    const message = await this.client.sendMail(mailOptions);

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
