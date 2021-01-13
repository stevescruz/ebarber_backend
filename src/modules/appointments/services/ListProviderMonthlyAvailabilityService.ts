import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthlyAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const availability = [];

    const appointments = await this.appointmentsRepository.findProviderAppointmentsByDate(
      { provider_id, year, month },
    );

    const daysInMonth = getDaysInMonth(new Date(year, month));

    if (appointments) {
      for (let i = 1; i <= daysInMonth; i += 1) {
        const foundAppointment = appointments.some(
          appointment => getDate(appointment.date) === i,
        );

        availability.push({
          day: i,
          available: !foundAppointment,
        });
      }
    }

    return availability;
  }
}
