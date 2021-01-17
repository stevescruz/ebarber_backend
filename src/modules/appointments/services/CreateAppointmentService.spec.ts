import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointmentDate = new Date(Date.now());

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date(appointmentDate.getTime());
      currentDate.setHours(currentDate.getHours() - 1);
      return currentDate.getTime();
    });

    const appointment = await createAppointmentService.execute({
      provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: appointmentDate,
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(
      '5a4edc68-d582-4653-af9b-5d425e8e384d',
    );
    expect(appointment.user_id).toBe('82ac8141-45ac-462c-a552-c1104d669099');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(Date.now());

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const currentDate = new Date(appointmentDate.getTime());
      currentDate.setHours(currentDate.getHours() - 1);
      return currentDate.getTime();
    });

    await createAppointmentService.execute({
      provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
        user_id: '82ac8141-45ac-462c-a552-c1104d669099',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with a date in the past', async () => {
    const appointmentDate = new Date(Date.now());

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date(appointmentDate.getTime());
      currentDate.setHours(currentDate.getHours() + 1);
      return currentDate.getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
        user_id: '82ac8141-45ac-462c-a552-c1104d669099',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
