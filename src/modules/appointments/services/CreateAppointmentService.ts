import { startOfHour, isAfter, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
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
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    if (provider_id === user_id) {
      throw new AppError(
        'Cannot book an appointment with yourself as the user and the provider at the same time.',
        401,
      );
    }

    const appointmentDate = startOfHour(date);

    const currentDate = startOfHour(new Date(Date.now()));

    const firstSlotStartsAt = 8;
    const lastSlotStartsAt = 17;

    if (
      getHours(appointmentDate) < firstSlotStartsAt ||
      getHours(appointmentDate) > lastSlotStartsAt
    ) {
      throw new AppError(
        'Cannot book an appointment in an hour that is before 8:00 AM or after 5:00 PM.',
        401,
      );
    }

    if (!isAfter(appointmentDate, currentDate)) {
      throw new AppError(
        'Cannot book an appointment with at a date in the past.',
        401,
      );
    }

    const checkAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (checkAppointmentInSameDate) {
      throw new AppError(
        'Cannot book an appointment with when the provider already has another appointment at the same date.',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointment.date, "MM/dd/yyyy 'at' hh:mm a");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment booked with you on ${formattedDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
