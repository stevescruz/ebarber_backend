import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(fileName: string): Promise<string> {
    try {
      await fs.promises.access(uploadConfig.uploadsFolder);
    } catch (err) {
      await fs.promises.mkdir(uploadConfig.uploadsFolder);
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, fileName),
      path.resolve(uploadConfig.uploadsFolder, fileName),
    );
    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, fileName);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
