interface IMailConfig {
  driver: 'ses' | 'ethereal';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
