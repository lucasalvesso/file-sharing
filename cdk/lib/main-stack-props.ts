import { StackProps } from "aws-cdk-lib";

export interface MainStackProps extends StackProps {
  env: {
    stage: Stage;
    region: Region;
  };
}

export type Region = "us-east-2";
export type Stage = "develop" | "production";
