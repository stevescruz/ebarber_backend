import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findProviderAppointmentsByMonth(
      { provider_id, year, month },
    );

    const NumberofDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysOfMonthArray = Array.from(
      { length: NumberofDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = daysOfMonthArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return { day, available: appointmentsInDay.length < 10 };
    });

    return availability;
  }
}
