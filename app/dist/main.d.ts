import { HandlerRouteResponse } from "./infrastcructure/interface/HandlerRouteResponse";
import { Request } from "express";
export declare const handler: (event: Request) => Promise<HandlerRouteResponse>;
