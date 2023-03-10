import { HandlerRouteResponse } from "../../infrastcructure/interface/HandlerRouteResponse";
import { GetS3UrlUseCase } from "../GetS3UrlUseCase";
import { AccessLinkBucket } from "../bucket/AccessLinkBucket";
import { AccessLinkDynamoDbTable } from "../table/AccessLinkDynamoDbTable";

export const handler = async (): Promise<HandlerRouteResponse> => {
  try {
    const service = new GetS3UrlUseCase(new AccessLinkDynamoDbTable(), new AccessLinkBucket());

    const accessData = await service.createAccess();

    return { statusCode: 200, content: accessData };
  } catch (e) {
    console.error(e);
    return { statusCode: 400 };
  }
};
