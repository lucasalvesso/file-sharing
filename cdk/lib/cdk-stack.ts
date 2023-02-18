import { aws_dynamodb, aws_lambda, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { MainStackProps } from "./main-stack-props";

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props);

    const accessLinkDynamoDbTable = new aws_dynamodb.Table(
      this,
      "access-link",
      {
        partitionKey: { name: "id", type: aws_dynamodb.AttributeType.NUMBER },
        tableName: `access-link-${props.stage}`,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

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
      code: aws_lambda.Code.fromAsset("../app/dist/"),
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
