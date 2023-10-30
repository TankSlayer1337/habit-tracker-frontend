import { apexDomain, projectName } from "../project-constants";
import { ApiUrl } from "../stage-environments/api-url";
import { Domain } from "../stage-environments/domains";

export interface AmplifyConfiguration {
  userPoolId: string,
  userPoolWebClientId: string,
  redirectUrl: string,
  cognitoDomain: string,
  apiScope: string,
  domain: string
}

const cognitoAuthDomain = 'auth.eu-north-1.amazoncognito.com';

const devUserPoolId = 'eu-north-1_bInBXmefY';
const devUserPoolWebClientId = '6guj0t1ptk4olqtgacpfae9u1c';
const devCognitoDomain = `${projectName}-dev.${cognitoAuthDomain}`;
const devApiScope = ApiUrl.dev + '/*';
export const localhostConfig: AmplifyConfiguration = {
  userPoolId: devUserPoolId,
  userPoolWebClientId: devUserPoolWebClientId,
  redirectUrl: `http://${Domain.localhost}:5173`,
  cognitoDomain: devCognitoDomain,
  apiScope: devApiScope,
  domain: Domain.localhost
}

const https = 'https://';
export const devConfig: AmplifyConfiguration = {
  userPoolId: devUserPoolId,
  userPoolWebClientId: devUserPoolWebClientId,
  redirectUrl: `${https}${Domain.dev}`,
  cognitoDomain: devCognitoDomain,
  apiScope: devApiScope,
  domain: `dev.${projectName}.${apexDomain}`
}

export const prodConfig: AmplifyConfiguration = {
  userPoolId: 'eu-north-1_9skDdFFqG',
  userPoolWebClientId: '6275dl256vvdcs0satj7oms4hg',
  redirectUrl: `${https}${projectName}.${apexDomain}`,
  cognitoDomain: `${projectName}-prod.${cognitoAuthDomain}`,
  apiScope: `${ApiUrl.prod}/*`,
  domain: `${projectName}.${apexDomain}`
}