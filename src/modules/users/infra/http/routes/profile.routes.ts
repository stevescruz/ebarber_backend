import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      new_password_confirmation: Joi.when('new_password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('new_password')).required(),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
