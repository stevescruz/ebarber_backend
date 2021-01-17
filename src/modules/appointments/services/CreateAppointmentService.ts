import { startOfHour, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const currentDate = startOfHour(new Date(Date.now()));

    if (!isAfter(appointmentDate, currentDate)) {
      throw new AppError(
        'An appointment at a date in the past cannot be booked.',
        401,
      );
    }

    const checkAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (checkAppointmentInSameDate) {
      throw new AppError(
        `An appointment at ${appointmentDate} was already booked.`,
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
