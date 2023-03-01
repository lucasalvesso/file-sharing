import { aws_dynamodb, aws_lambda, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { MainStackProps } from "./main-stack-props";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props);

    const accessLinkDynamoDbTable = new aws_dynamodb.Table(
      this,
      "access-link",
      {
        partitionKey: { name: "id", type: aws_dynamodb.AttributeType.STRING },
        tableName: `access-link-${props.env.stage}`,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    const accessLinkDynamoDbTablePolicy = new Policy(
      this,
      "lambda-dynamo-table",
      {
        policyName: "lambda-dynamo-table",
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Scan"],
            resources: [accessLinkDynamoDbTable.tableArn],
          }),
        ],
      }
    );

    const uploadBucket = new Bucket(this, "bucket-" + props.env.stage, {
      bucketName: "filesharing-" + props.env.stage,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const uploadBucketPolicy = new Policy(this, "lambda-s3-bucket", {
      policyName: "lambda-s3-bucket",
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["s3:*"],
          resources: [uploadBucket.bucketArn],
        }),
      ],
    });

    const environment = {
      ACCESS_LINK_DYNAMO_DB_TABLE: accessLinkDynamoDbTable.tableName,
      BUCKET: uploadBucket.bucketName,
      DEFAULT_REGION: props.env.region,
      STAGE: props.env.stage,
    };

    const lambdaUpload = new aws_lambda.Function(this, "file-sharing-upload", {
      code: aws_lambda.Code.fromAsset("../app/dist/upload"),
      handler: "GetS3UrlResource.handler",
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      environment,
    });

    lambdaUpload.role?.attachInlinePolicy(accessLinkDynamoDbTablePolicy);
    lambdaUpload.role?.attachInlinePolicy(uploadBucketPolicy);

    const lambdaDownload = new aws_lambda.Function(
      this,
      "file-sharing-download",
      {
        code: aws_lambda.Code.fromAsset("../app/dist/upload"),
        handler: "GetFileUrlResource.handler",
        runtime: aws_lambda.Runtime.NODEJS_14_X,
        environment,
      }
    );

    lambdaDownload.role?.attachInlinePolicy(accessLinkDynamoDbTablePolicy);
    lambdaDownload.role?.attachInlinePolicy(uploadBucketPolicy);

    const api = new RestApi(this, "access-link-api", {
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST"],
        allowCredentials: true,
        allowOrigins: ["http://localhost:8004"],
      },
    });

    const apiResource = api.root.addResource("upload");
    apiResource.addMethod("POST", new LambdaIntegration(lambdaUpload));
    apiResource.addMethod("GET", new LambdaIntegration(lambdaDownload));
  }
}
