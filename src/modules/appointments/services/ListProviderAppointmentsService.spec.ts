import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all appointments in a given day for a given provider', async () => {
    const year = 2021;
    const month = 1;
    const day = 15;

    const timeSlotsArray = Array.from({ length: 5 }, (_, index) => index + 11);

    const expectedAppointments = await Promise.all(
      timeSlotsArray.map(timeSlot => {
        return fakeAppointmentsRepository.create({
          provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
          user_id: '82ac8141-45ac-462c-a552-c1104d669099',
          date: new Date(year, month - 1, day, timeSlot, 0, 0),
        });
      }),
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year,
      month,
      day,
    });

    expect(appointments).toEqual(expectedAppointments);
  });
});
