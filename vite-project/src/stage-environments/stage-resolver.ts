import { Stage } from "./stage";
import { devConfig, prodConfig } from "../amplify/amplify-configurations";
import { HostResolver } from "./host-resolver";

export class StageResolver {

  public static resolve(): Stage {
    if (HostResolver.isLocalHost() || this.isHostName(devConfig.domain)){
      return Stage.Dev;
    } else if (this.isHostName(prodConfig.domain)){
      return Stage.Prod;
    } else {
      throw Error('Failed to resolve stage.');
    }
  }

  private static isHostName(domain: string) {
    return window.location.hostname === domain;
  }
}