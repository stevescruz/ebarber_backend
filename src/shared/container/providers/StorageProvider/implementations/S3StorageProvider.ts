import path from 'path';
import fs from 'fs';
import { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(fileName: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, fileName);
    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.client
      .putObject({
        Bucket: 'app-ebarber',
        Key: fileName,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'app-ebarber',
        Key: fileName,
      })
      .promise();
  }
}
