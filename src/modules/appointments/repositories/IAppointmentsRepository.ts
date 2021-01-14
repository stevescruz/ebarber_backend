import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindProviderAppointmentsByMonthDTO from '@modules/appointments/dtos/IFindProviderAppointmentsByMonthDTO';
import IFindProviderAppointmentsByDayDTO from '@modules/appointments/dtos/IFindProviderAppointmentsByDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findProviderAppointmentsByMonth(
    data: IFindProviderAppointmentsByMonthDTO,
  ): Promise<Appointment[]>;
  findProviderAppointmentsByDay(
    data: IFindProviderAppointmentsByDayDTO,
  ): Promise<Appointment[]>;
}
