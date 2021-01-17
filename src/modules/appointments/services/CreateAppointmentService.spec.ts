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
    const appointment = await createAppointmentService.execute({
      provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: new Date(),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(
      'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
    );
  });

  it('should not be able to create two appointments at the same time', async () => {
    const date = new Date(20, 9, 10, 11);

    await fakeAppointmentsRepository.create({
      provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
        user_id: '82ac8141-45ac-462c-a552-c1104d669099',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
