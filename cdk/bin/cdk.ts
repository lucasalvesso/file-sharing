#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../lib/cdk-stack";

const app = new cdk.App();
new MainStack(app, "CdkStack", {
  stage: "develop",
  region: "us-east-2",
});
