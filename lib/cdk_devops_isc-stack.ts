import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDevopsIscStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkDevopsIscQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CdkDevopsIscStack',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('GuerreroDevOps/cdk_devops_isc', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
