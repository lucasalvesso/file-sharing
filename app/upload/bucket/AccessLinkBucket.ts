import { S3Service } from "../../infrastcructure/aws/S3Service";
import { v4 as uuidv4 } from "uuid";

export class AccessLinkBucket extends S3Service {
  private bucketName = process.env.BUCKET as string;

  public createFile(key: string) {
    const idPath = uuidv4();
    const path = `${idPath}/${key}`;

    return { url: this.getUrlForFileUpload(this.bucketName, path), path: path };
  }

  public getFile(path: string) {
    return { url: this.getUrlForFileDownload(this.bucketName, path) };
  }
}
