import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment.', async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(8);

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

  it('should not be able to create two appointments at the same time.', async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(8);

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

  it('should not be able to create an appointment with a date in the past.', async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(8);

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

  it('should not be able to create a new appointment where the user and the provider are the same person.', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
        user_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
        date: new Date(Date.now()),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8:00 AM.', async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(7);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date(appointmentDate.getTime());
      currentDate.setHours(currentDate.getHours() - 1);
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

  it('should not be able book an appointment after 5:00 PM.', async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(18);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date(appointmentDate.getTime());
      currentDate.setHours(currentDate.getHours() - 1);
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

  it("should send a notification to the appointment's provider after successfully creating an appointment", async () => {
    const appointmentDate = new Date(Date.now());
    appointmentDate.setHours(8);

    const year = appointmentDate.getFullYear().toString();
    const month = (appointmentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = appointmentDate.getDate().toString().padStart(2, '0');

    const createNotification = jest.spyOn(
      fakeNotificationsRepository,
      'create',
    );

    await createAppointmentService.execute({
      provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: appointmentDate,
    });

    expect(createNotification).toHaveBeenCalledWith({
      recipient_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      content: `New appointment booked with you on ${month}/${day}/${year} at 08:00 AM`,
    });
  });
});
