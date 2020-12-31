import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendEmail(data: ISendMailDTO): Promise<void>;
}
