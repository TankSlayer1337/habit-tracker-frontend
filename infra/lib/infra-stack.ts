import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { apexDomain, projectName } from './constants';
import { StageConfiguration } from './stage-configurations';

interface InfraStackProps extends cdk.StackProps {
  stageConfig: StageConfiguration,
  certificate: Certificate
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);
    
    const websiteBucket = new Bucket(this, 'WebsiteOriginBucket', {
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: apexDomain
    });

    const stageName = props.stageConfig.stageName;
    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `Origin Access Identity for ${projectName} ${stageName}.`
    });
    originAccessIdentity.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    websiteBucket.grantRead(originAccessIdentity);

    const stageSubDomain = props.stageConfig.stageSubDomain;
    const projectStageSubDomain = `${stageSubDomain}${projectName}`;
    const fullStageDomain = `${projectStageSubDomain}.${apexDomain}`;
    const distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, {
          originAccessIdentity: originAccessIdentity
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      domainNames: [fullStageDomain],
      certificate: props.certificate,
      defaultRootObject: 'index.html'
    });

    new ARecord(this, 'CloudFrontARecord', {
      zone: hostedZone,
      recordName: projectStageSubDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      ttl: cdk.Duration.seconds(0)  // TODO: reset to default?
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [Source.asset('../vite-project/dist')],
      destinationBucket: websiteBucket,
      distribution
    });
  }
}
