#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../lib/cdk-stack";

const app = new cdk.App();
new MainStack(app, "FileSharingStack", {
  env: {
    region: "us-east-2",
    stage: "develop",
  },
});
