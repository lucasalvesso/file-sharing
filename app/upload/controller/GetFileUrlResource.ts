import { Request } from "express";
import { HandlerRouteResponse } from "../../infrastcructure/interface/HandlerRouteResponse";
import { GetFileUrlUseCase } from "../GetFileUrlUseCase";
import { AccessLinkDynamoDbTable } from "../table/AccessLinkDynamoDbTable";
import { AccessLinkBucket } from "../bucket/AccessLinkBucket";

export const handler = async (
  event: Request
): Promise<HandlerRouteResponse> => {
  try {
    const fileKey = event.params.fileKey;

    if (!fileKey) {
      return { statusCode: 404 };
    }

    const service = new GetFileUrlUseCase(
      new AccessLinkDynamoDbTable(),
      new AccessLinkBucket()
    );

    const item = await service.getFileUrl(fileKey);

    return { statusCode: 200, content: item };
  } catch (e) {
    console.error(e);
    return { statusCode: 400 };
  }
};
