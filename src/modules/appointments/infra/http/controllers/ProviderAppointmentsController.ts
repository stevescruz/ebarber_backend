import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ListProviderAppointments {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { year, month, day } = req.body;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      year,
      month,
      day,
    });

    return res.json(appointments);
  }
}
