export default interface IMailProvider {
  sendEmail(to: string, body: string): Promise<void>;
}
