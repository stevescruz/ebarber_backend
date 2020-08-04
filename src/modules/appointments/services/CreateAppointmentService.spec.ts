import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(
      'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
    );
  });

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const date = new Date(20, 9, 10, 11);

    await createAppointmentService.execute({
      date,
      provider_id: '5cd19d9f-6771-4c50-8457-3d7faabea4dd',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '5a4edc68-d582-4653-af9b-5d425e8e384d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
