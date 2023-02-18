import {MainStackProps} from "./main-stack-props";
import {App, Stack} from "aws-cdk-lib";

export class MainStack extends Stack {
    constructor(scope: App, id: string, props: MainStackProps) {
        super(scope, id, props);

        const environment = {
            STAGE: props.stage,
        };

    }

}