import { Amplify } from 'aws-amplify';
import amplifyBaseconfiguration from './amplify-base-configuration';
import { AmplifyStageConfiguration, devConfig, localhostConfig, prodConfig } from './amplify-stage-configurations';

// modified version of this: https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
export function configureAmplify(): void {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  const isDev = Boolean(
    window.location.hostname === devConfig.fullStageDomain
  );

  const isProd = Boolean(
    window.location.hostname === prodConfig.fullStageDomain
  );

  let stageConfig: AmplifyStageConfiguration;
  if (isLocalhost) {
    stageConfig = localhostConfig;
  } else if (isDev) {
    stageConfig = devConfig;
  } else if (isProd) {
    stageConfig = prodConfig;
  } else {
    throw Error('Failed to get Amplify configuration for stage.');
  }

  const updatedAwsConfig = {
    ...amplifyBaseconfiguration.Auth,
    userPoolId: stageConfig.userPoolId,
    userPoolWebClientId: stageConfig.userPoolWebClientId,
    cookieStorage: {
      ...amplifyBaseconfiguration.Auth.cookieStorage,
      domain: stageConfig.fullStageDomain,
      secure: isLocalhost ? false : amplifyBaseconfiguration.Auth.cookieStorage.secure
    },
    oauth: {
      ...amplifyBaseconfiguration.Auth.oauth,
      scope: [
        'email',
        'profile',
        'openid',
        stageConfig.apiScope
      ],
      domain: stageConfig.cognitoDomain,
      redirectSignIn: stageConfig.redirectUrl,
      redirectSignOut: stageConfig.redirectUrl,
    }
  }

  Amplify.configure(updatedAwsConfig);
}