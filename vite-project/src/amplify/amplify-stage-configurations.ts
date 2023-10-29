import { apexDomain, projectName } from "./constants";

export interface AmplifyStageConfiguration {
  userPoolId: string,
  userPoolWebClientId: string,
  redirectUrl: string,
  cognitoDomain: string,
  apiScope: string,
  fullStageDomain: string
}

const cognitoAuthDomain = 'auth.eu-north-1.amazoncognito.com';

const devUserPoolId = 'eu-north-1_bInBXmefY';
const devUserPoolWebClientId = '6guj0t1ptk4olqtgacpfae9u1c';
export const localhostConfig: AmplifyStageConfiguration = {
  userPoolId: devUserPoolId,
  userPoolWebClientId: devUserPoolWebClientId,
  redirectUrl: 'http://localhost:5173',
  cognitoDomain: `${projectName}-dev.${cognitoAuthDomain}`,
  apiScope: `https://dev.${projectName}.api.${apexDomain}/*`,
  fullStageDomain: 'localhost'
}

export const devConfig: AmplifyStageConfiguration = {
  userPoolId: devUserPoolId,
  userPoolWebClientId: devUserPoolWebClientId,
  redirectUrl: `https://dev.${projectName}.${apexDomain}`,
  cognitoDomain: `${projectName}-dev.${cognitoAuthDomain}`,
  apiScope: `https://dev.${projectName}.api.${apexDomain}/*`,
  fullStageDomain: `dev.${projectName}.${apexDomain}`
}

export const prodConfig: AmplifyStageConfiguration = {
  userPoolId: 'eu-north-1_9skDdFFqG',
  userPoolWebClientId: '6275dl256vvdcs0satj7oms4hg',
  redirectUrl: `https://${projectName}.${apexDomain}`,
  cognitoDomain: `${projectName}-prod.${cognitoAuthDomain}`,
  apiScope: `https://prod.${projectName}.api.${apexDomain}/*`,
  fullStageDomain: `${projectName}.${apexDomain}`
}