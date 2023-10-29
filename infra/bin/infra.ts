#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { GlobalResourcesStack } from '../lib/global-resources-stack';
import { projectName } from '../lib/constants';
import { stageConfigurations } from '../lib/stage-configurations';

const app = new cdk.App();
const nVirginia = 'us-east-1';
const stockholm = 'eu-north-1';
const account = process.env.CDK_DEFAULT_ACCOUNT;
stageConfigurations.forEach(stageConfig => {
  const globalResourcesStack = new GlobalResourcesStack(app, `${projectName}-frontend-global-resources-${nVirginia}-${stageConfig.stageName}`, {
    env: { region: nVirginia, account: account },
    crossRegionReferences: true,
    stageConfig: stageConfig
  });
  
  new InfraStack(app, `${projectName}-frontend-${stockholm}`, {
    env: { region: stockholm, account: account },
    certificate: globalResourcesStack.certificate,
    crossRegionReferences: true
  });
});