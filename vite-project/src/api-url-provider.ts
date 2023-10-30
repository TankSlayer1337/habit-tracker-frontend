import { Stage } from "./stage-environments/stage";
import { StageResolver } from "./stage-environments/stage-resolver";
import { ApiUrl } from "./stage-environments/api-url";

export class ApiUrlProvider {
  private static apiUrl: string;

  public static getApiUrl(): string {
    if (this.apiUrl) {
      return this.apiUrl;
    }

    const stage = StageResolver.resolve();
    switch (stage) {
      case Stage.Dev:
        this.apiUrl = ApiUrl.dev;
        break;
      case Stage.Prod:
        this.apiUrl = ApiUrl.prod;
        break;
      default:
        throw Error('Failed to resolve stage API URL.')
    }

    return this.apiUrl;
  }
}