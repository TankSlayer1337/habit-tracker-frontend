import { Environment } from "aws-cdk-lib"

export interface StageConfiguration {
  awsEnv: Environment,
  stageName: string,
  stageSubDomain: string
}

const stockholm: Environment = { region: 'eu-north-1', account: process.env.CDK_DEFAULT_ACCOUNT };

export const devConfiguration: StageConfiguration = {
  awsEnv: stockholm,
  stageName: 'dev',
  stageSubDomain: 'dev.'
}

export const prodConfiguration: StageConfiguration = {
  awsEnv: stockholm,
  stageName: 'prod',
  stageSubDomain: ''
}

export const stageConfigurations: StageConfiguration[] = [devConfiguration, prodConfiguration]