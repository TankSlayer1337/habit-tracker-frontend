import { apexDomain, projectName } from "../project-constants";

export class Domain {
  public static localhost = 'localhost';
  public static dev = `dev.${projectName}.${apexDomain}`;
  public static prod = `${projectName}.${apexDomain}`;
}