import { AccessLinkDynamoDbTable } from "./table/AccessLinkDynamoDbTable";
import { AccessLinkBucket } from "./bucket/AccessLinkBucket";
import { Generator } from "../common/Generator";
import { IAccessLink } from "./table/IAccessLink";

export class GetS3UrlUseCase {
  public constructor(
    private dynamodb: AccessLinkDynamoDbTable,
    private s3Service: AccessLinkBucket
  ) {}

  public async createAccess() {
    const key = Generator.generateShortId();

    const s3Data = this.s3Service.createFile(key);

    const dynamoDbItem: IAccessLink = {
      id: key,
      path: s3Data.path,
    };

    await this.dynamodb.createLink(dynamoDbItem);

    return { url: s3Data.url, key: key };
  }
}
