import { S3 } from "aws-sdk";
import { AwsService } from "./AwsService";

export class S3Service extends AwsService {
  private s3 = new S3({ region: process.env.DEFAULT_REGION });
  getUrlForFileUpload(Bucket: string, Key: string) {
    const params = { Bucket, Key, Expires: 600 };
    return this.s3.getSignedUrl("putObject", params);
  }

  getUrlForFileDownload(Bucket: string, Key: string) {
    const params = { Bucket, Key, Expires: 60 * 24 * 2 };
    return this.s3.getSignedUrl("getObject", params);
  }
}
