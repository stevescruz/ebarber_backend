import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindProviderAppointmentsByMonth from '@modules/appointments/dtos/IFindProviderAppointmentsByMonthDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findProviderAppointmentsByDate(
    data: IFindProviderAppointmentsByMonth,
  ): Promise<Appointment[]>;
}
