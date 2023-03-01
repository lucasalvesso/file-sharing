import { HandlerRouteResponse } from "./infrastcructure/interface/HandlerRouteResponse";
import { Request } from "express";

export const handler = async (
  event: Request
): Promise<HandlerRouteResponse> => {
  try {
    console.log("evento: ", JSON.stringify(event.body));

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
    };
  }
};
