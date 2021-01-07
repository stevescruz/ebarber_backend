import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update a user profile's name and email.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Abaddon',
      email: 'abaddon@valve.com',
    });

    expect(updatedUser.name).toBe('Abaddon');
    expect(updatedUser.email).toBe('abaddon@valve.com');
  });

  it('should not be able to use a user_id that does not belong to any user.', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'nonexistent-user_id',
        name: 'Uther The Lightbringer',
        email: 'uther@blizzard.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change a user's email to an email that belongs to another user.", async () => {
    await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    const user = await fakeUsersRepository.create({
      name: 'Uther The Lightbringer',
      email: 'uther@blizzard.com',
      password: 'arthas',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Uther is dead',
        email: 'arthas@blizzard.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update a user's password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      old_password: 'jaina',
      new_password: 'rylai',
    });

    expect(updatedUser.password).toBe('rylai');
  });

  it("should be able to hash the user's new password.", async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Arthas Menethil',
      email: 'Arthas Menethil',
      old_password: 'jaina',
      new_password: 'rylai',
    });

    expect(generateHash).toBeCalledWith('rylai');
    expect(updatedUser.password).toBe('rylai');
  });

  it("should not be able to update a user's password when old_password does not match the current password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Abaddon',
        email: 'abaddon@valve.com',
        old_password: 'wrong-old-password',
        new_password: 'rylai',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a user's password by informing new_password without old_password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Abaddon',
        email: 'abaddon@valve.com',
        new_password: 'rylai',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a user's password by informing old_password without new_password.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Arthas Menethil',
      email: 'arthas@blizzard.com',
      password: 'jaina',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Abaddon',
        email: 'abaddon@valve.com',
        old_password: 'jaina',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
