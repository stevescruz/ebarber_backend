import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able add an avatar to an existent user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it("should not be able to add or update an nonexistent user's avatar", async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'd06895cc-2488-45a2-8732-51b65d909837',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update an existent user's avatar after deleting the previous avatar", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    });

    user.avatar = 'oldAvatar.jpg';

    const updatedUser = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'newAvatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('oldAvatar.jpg');
    expect(updatedUser.avatar).toBe('newAvatar.jpg');
  });
});
