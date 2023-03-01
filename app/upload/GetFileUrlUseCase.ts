import { AccessLinkDynamoDbTable } from "./table/AccessLinkDynamoDbTable";
import { AccessLinkBucket } from "./bucket/AccessLinkBucket";

export class GetFileUrlUseCase {
  public constructor(
    private dynamodb: AccessLinkDynamoDbTable,
    private s3Service: AccessLinkBucket
  ) {}

  public async getFileUrl(key: string) {
    const item = await this.dynamodb.findLink(key);

    if (!item) {
      return;
    }

    return this.s3Service.getFile(item.path);
  }
}
