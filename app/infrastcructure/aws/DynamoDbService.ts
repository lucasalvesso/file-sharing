import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AwsService } from "./AwsService";

export class DynamoDbService extends AwsService {
  private dynamodb = new DocumentClient({
    region: process.env.DEFAULT_REGION,
  });

  public constructor(private tableName: string) {
    super();
  }

  public async create(content: DocumentClient.PutItemInputAttributeMap) {
    return await this.dynamodb
      .put({
        Item: content,
        TableName: this.tableName,
      })
      .promise();
  }

  public async read(item: DocumentClient.Key) {
    return await this.dynamodb
      .get({
        TableName: this.tableName,
        Key: item,
      })
      .promise();
  }
}
