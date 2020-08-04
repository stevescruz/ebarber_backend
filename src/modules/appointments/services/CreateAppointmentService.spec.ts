import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

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

  // it('should not be able to create two appointments at the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
