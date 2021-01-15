import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllByProviderAndMonthDTO from '@modules/appointments/dtos/IFindAllByProviderAndMonthDTO';
import IFindAllByProviderAndDayDTO from '@modules/appointments/dtos/IFindAllByProviderAndDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllByProviderAndMonth(
    data: IFindAllByProviderAndMonthDTO,
  ): Promise<Appointment[]>;
  findAllByProviderAndDay(
    data: IFindAllByProviderAndDayDTO,
  ): Promise<Appointment[]>;
}
