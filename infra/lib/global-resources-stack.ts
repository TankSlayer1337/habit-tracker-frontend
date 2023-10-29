import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { apexDomain, projectName } from './constants';
import { StageConfiguration } from './stage-configurations';

interface GlobalResourcesStackProps extends cdk.StackProps {
  stageConfig: StageConfiguration
}

export class GlobalResourcesStack extends cdk.Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: GlobalResourcesStackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: apexDomain
    });

    const stageSubDomain = props.stageConfig.stageSubDomain;
    this.certificate = new Certificate(this, 'Certificate', {
      domainName: `${stageSubDomain}${projectName}.${apexDomain}`,
      validation: CertificateValidation.fromDns(hostedZone)
    });
    this.certificate.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
  }
}