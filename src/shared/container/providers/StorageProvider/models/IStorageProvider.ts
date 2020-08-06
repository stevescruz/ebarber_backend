export default interface IStorageProvider {
  saveFile(fileName: string): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
}
