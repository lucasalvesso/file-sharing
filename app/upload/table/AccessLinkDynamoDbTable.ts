import { DynamoDbService } from "../../infrastcructure/aws/DynamoDbService";
import { IAccessLink } from "./IAccessLink";

export class AccessLinkDynamoDbTable extends DynamoDbService {
  public constructor() {
    super(process.env.ACCESS_LINK_DYNAMO_DB_TABLE as string);
  }

  public async createLink(item: IAccessLink) {
    return await this.create(item);
  }

  public async findLink(
    key: IAccessLink["id"]
  ): Promise<IAccessLink | undefined> {
    const object = await this.read({
      id: key,
    });

    if (!object?.Item) {
      return;
    }

    return object.Item as IAccessLink;
  }
}
