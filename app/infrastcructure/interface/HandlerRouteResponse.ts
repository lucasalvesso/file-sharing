export interface HandlerRouteResponse {
  statusCode: StatusResponse;
  message?: string;
  content?: { [key: string]: any };
}

type StatusResponse = 200 | 400 | 404;
