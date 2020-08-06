import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.storage.push(fileName);
    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const fileIndex = this.storage.indexOf(fileName);

    if (fileIndex !== -1) {
      this.storage.splice(fileIndex, 1);
    }
  }
}
