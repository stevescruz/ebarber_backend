import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailPasswordRecoveryService from '@modules/users/services/SendEmailPasswordRecoveryService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmailPasswordRecovery = container.resolve(
      SendEmailPasswordRecoveryService,
    );

    await sendEmailPasswordRecovery.execute({
      email,
    });

    return res.status(204).json();
  }
}
