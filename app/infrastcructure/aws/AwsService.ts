import { config, SharedIniFileCredentials } from "aws-sdk";
import * as process from "process";

export class AwsService {
  constructor() {
    if (process.env.STAGE === "local") {
      const credentials = new SharedIniFileCredentials({
        profile: process.env.DEFAULT_PROFILE,
      });
      config.credentials = credentials;
    }
  }
}
