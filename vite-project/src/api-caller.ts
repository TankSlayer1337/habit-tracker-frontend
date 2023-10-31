import { AmplifyUser } from "@aws-amplify/ui";
import { ApiUrlProvider } from "./api-url-provider";

export class ApiCaller {
  public static async call(user: AmplifyUser, resource: string = '', method: string = 'GET', body?: object): Promise<globalThis.Response> {
    const url = ApiUrlProvider.getApiUrl() + resource;  
    const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
    const requestInit: RequestInit = {
      method: method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    };
    if (body) {
      requestInit.body = JSON.stringify(body)
    }
    const response = await fetch(url, requestInit);

    if (!response.ok) {
      throw new Error(`Fetch against ${url} failed.`);
    }

    return response;
  }
}