import { apexDomain, projectName } from "../project-constants";

export class ApiUrl {
  private static https = 'https://';
  private static baseUrl = `${projectName}.api.${apexDomain}`;
  
  public static dev = this.getStageUrl('dev');
  public static prod = this.getStageUrl('prod');

  private static getStageUrl(stageName: string) {
    return `${this.https}${stageName}.${this.baseUrl}`;
  }
}