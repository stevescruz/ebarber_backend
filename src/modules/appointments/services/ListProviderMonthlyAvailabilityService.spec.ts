import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthlyAvailabilityService from '@modules/appointments/services/ListProviderMonthlyAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderMonthlyAvailabilityService: ListProviderMonthlyAvailabilityService;

describe('ListProviderMonthlyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthlyAvailabilityService = new ListProviderMonthlyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all days and their availability from a given month for a given service provider', async () => {
    const month = 2;
    const firstTimeSlotStartsAt = 8;
    const lastTimeSlotEndsAt = 18;
    const timeSlots = Array.from(
      { length: lastTimeSlotEndsAt - firstTimeSlotStartsAt },
      (_, index) => index + firstTimeSlotStartsAt,
    );

    await Promise.all(
      timeSlots.map(timeSlot =>
        fakeAppointmentsRepository.create({
          provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
          date: new Date(2021, month - 1, 12, timeSlot, 0, 0),
        }),
      ),
    );

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      date: new Date(2021, month - 1, 13, 12, 0, 0),
    });

    const availability = await listProviderMonthlyAvailabilityService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year: 2021,
      month: 2,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: false },
        { day: 13, available: true },
      ]),
    );
  });
});
