import { celebrate, Joi, Segments } from 'celebrate';

import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({ [Segments.BODY]: { email: Joi.string().email().required() } }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().uuid().required(),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
