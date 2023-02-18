import { MainStackProps } from "./main-stack-props";
import { App, aws_lambda, RemovalPolicy, Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb/lib/table";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export class MainStack extends Stack {
  constructor(scope: App, id: string, props: MainStackProps) {
    super(scope, id, props);

    const environment = {
      STAGE: props.stage,
    };

    const accessLinkDynamoDbTable = new Table(this, "access-link", {
      partitionKey: { name: "id", type: AttributeType.NUMBER },
      tableName: `access-link-${props.stage}`,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const lambdaDynamoDbPolicy = new Policy(this, "lambda-dynamo-table", {
      policyName: "lambda-dynamo-table",
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Scan"],
          resources: [accessLinkDynamoDbTable.tableArn],
        }),
      ],
    });

    const lambda = new aws_lambda.Function(this, "file-sharing", {
      code: aws_lambda.Code.fromAsset(".dist/app/"),
      handler: "main.handler",
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      environment: {
        ACCESS_LINK_DYNAMO_DB_TABLE: accessLinkDynamoDbTable.tableName,
      },
    });

    lambda.role?.attachInlinePolicy(lambdaDynamoDbPolicy);

    const api = new RestApi(this, "access-link-api");
    const apiResource = api.root.addResource("{proxy+}");
    apiResource.addMethod("GET", new LambdaIntegration(lambda));
  }
}
