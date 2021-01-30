interface IMailConfig {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: process.env.MAIL_EMAIL_ADDRESS_FROM,
      name: process.env.MAIL_NAME_FROM,
    },
  },
} as IMailConfig;
