import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllByProviderAndDay(
      { provider_id, year, month, day },
    );
    const workShiftStartsAt = 8;
    const numberOfTimeSlots = 10;

    const hoursOfDay = Array.from(
      { length: numberOfTimeSlots },
      (_, index) => index + workShiftStartsAt,
    );

    const currentDate = new Date(Date.now());

    const availability = hoursOfDay.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const timeSlotDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(timeSlotDate, currentDate),
      };
    });

    return availability;
  }
}
