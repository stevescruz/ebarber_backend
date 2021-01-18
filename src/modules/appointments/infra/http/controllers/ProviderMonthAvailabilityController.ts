import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailability {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;

    const { year, month } = req.body;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      year,
      month,
    });

    return res.json(availability);
  }
}
