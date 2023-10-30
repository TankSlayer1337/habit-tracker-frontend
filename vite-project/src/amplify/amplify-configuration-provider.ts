import { Amplify } from 'aws-amplify';
import amplifyBaseconfiguration from './amplify-base-configuration';
import { AmplifyConfiguration, devConfig, localhostConfig, prodConfig } from './amplify-configurations';
import { HostResolver } from '../stage-environments/host-resolver';
import { StageResolver } from '../stage-environments/stage-resolver';
import { Stage } from '../stage-environments/stage';

// modified version of this: https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
export function configureAmplify(): void {
  let envConfig: AmplifyConfiguration;
  if (HostResolver.isLocalHost()) {
    envConfig = localhostConfig;
  } else {
    const stage = StageResolver.resolve();
    switch (stage) {
      case Stage.Dev:
        envConfig = devConfig;
        break;
      case Stage.Prod:
        envConfig = prodConfig;
        break;
    }
  }

  const updatedAwsConfig = {
    ...amplifyBaseconfiguration.Auth,
    userPoolId: envConfig.userPoolId,
    userPoolWebClientId: envConfig.userPoolWebClientId,
    cookieStorage: {
      ...amplifyBaseconfiguration.Auth.cookieStorage,
      domain: envConfig.domain,
      secure: HostResolver.isLocalHost() ? false : amplifyBaseconfiguration.Auth.cookieStorage.secure
    },
    oauth: {
      ...amplifyBaseconfiguration.Auth.oauth,
      scope: [
        'email',
        'profile',
        'openid',
        envConfig.apiScope
      ],
      domain: envConfig.cognitoDomain,
      redirectSignIn: envConfig.redirectUrl,
      redirectSignOut: envConfig.redirectUrl,
    }
  }

  Amplify.configure(updatedAwsConfig);
}