import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsByProviderAndMonthDTO from '@modules/appointments/dtos/IFindAllAppointmentsByProviderAndMonthDTO';
import IFindAllAppointmentsByProviderAndDayDTO from '@modules/appointments/dtos/IFindAllAppointmentsByProviderAndDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllByProviderAndMonth(
    data: IFindAllAppointmentsByProviderAndMonthDTO,
  ): Promise<Appointment[]>;
  findAllByProviderAndDay(
    data: IFindAllAppointmentsByProviderAndDayDTO,
  ): Promise<Appointment[]>;
}
