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
  it('should be able to list availability for time slots from a given day for a given service provider', async () => {
    const day = 15;
    const month = 12;
    const year = 2021;

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      date: new Date(year, month - 1, day, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
      date: new Date(year, month - 1, day, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
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
});

// it('should be able to list all available time slots from a given day for a given service provider', async () => {

// const workShiftStartsAt = 8;
// const workShiftEndsAt = 16;

// const timeSlotsInDayArray = Array.from(
//   { length: workShiftEndsAt - workShiftStartsAt },
//   (_, index) => index + workShiftEndsAt,
// );

// await Promise.all(
//   timeSlotsInDayArray.map(timeSlot => {
//     return fakeAppointmentsRepository.create({
//       provider_id: 'ce619769-f7b3-40f8-b51f-54cbdbadb95f',
//       date: new Date(year, month - 1, day, timeSlot, 0, 0),
//     });
//   }),
// );
