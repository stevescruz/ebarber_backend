import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all days and their availability from a given month for a given service provider', async () => {
    const year = 2021;
    const month = 2;
    const workShiftStartsAt = 8;
    const workShiftEndsAt = 18;
    const timeSlots = Array.from(
      { length: workShiftEndsAt - workShiftStartsAt },
      (_, index) => index + workShiftStartsAt,
    );

    await Promise.all(
      timeSlots.map(timeSlot =>
        fakeAppointmentsRepository.create({
          provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
          date: new Date(year, month - 1, 12, timeSlot, 0, 0),
        }),
      ),
    );

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      date: new Date(year, month - 1, 13, 12, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year,
      month,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: false },
        { day: 13, available: true },
      ]),
    );
  });

  it('should not be able to list as available a day without any slots', async () => {
    const year = 2030;
    const month = 5;
    const workShiftStartsAt = 8;
    const workShiftEndsAt = 18;
    const timeSlots = Array.from(
      { length: workShiftEndsAt - workShiftStartsAt },
      (_, index) => index + workShiftStartsAt,
    );

    await Promise.all(
      timeSlots.map(timeSlot =>
        fakeAppointmentsRepository.create({
          provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
          date: new Date(year, month - 1, 15, timeSlot, 0, 0),
        }),
      ),
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year,
      month,
    });

    expect(availability).toEqual(
      expect.arrayContaining([{ day: 15, available: false }]),
    );
  });
});
