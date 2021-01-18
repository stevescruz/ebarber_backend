import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list availability for time slots from a given day for a given service provider.', async () => {
    const year = 2001;
    const month = 12;
    const day = 15;

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(year, month - 1, day, 7).getTime(),
      );

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: new Date(year, month - 1, day, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: new Date(year, month - 1, day, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      user_id: '82ac8141-45ac-462c-a552-c1104d669099',
      date: new Date(year, month - 1, day, 17, 0, 0),
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year,
      month,
      day,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: true,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 16,
          available: true,
        },
        {
          hour: 17,
          available: false,
        },
      ]),
    );
  });

  it('should be able to list available as false for time slots with hours that already passed.', async () => {
    const year = 2021;
    const month = 7;
    const day = 8;
    const hour = 12;

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(year, month - 1, day, hour).getTime(),
      );

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      year,
      month,
      day,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: false,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
      ]),
    );
  });
});
