import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  try {
    console.log(event.body);

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
  }
};
