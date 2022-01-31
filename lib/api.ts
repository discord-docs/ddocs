import AuthenticationContext from "../components/context/AuthContext";
import CurrentUser from "./currentUser";

export const BaseApiURl = "https://api.ddocs.io";

export const Routes = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  Refresh: "/auth/refresh",
  CurrentUser: "/users/@me",
};

export default class API {
  private _jwt?: string;
  private _context: AuthenticationContext;

  constructor(context: AuthenticationContext) {
    this._context = context;
  }

  public setJWT(jwt: string) {
    this._jwt = jwt;
  }

  public async getCurrentUser(): Promise<CurrentUser | undefined> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.CurrentUser)
    );

    switch (result.status) {
      case 200:
        return (await result.json()) as CurrentUser;
      case 401 || 403 || 404:
        throw new RequireSignInError();
      default:
        this.handleUnknownError(result);
    }
  }

  public static getRoute(route: string) {
    return `${BaseApiURl}${route}`;
  }

  private handleUnknownError(response: Response) {
    console.error("Got unsuspected status code", response);
  }
}

// required to sign in
export class RequireSignInError extends Error {
  constructor(message: string = "You must be signed in to access this route.") {
    super(message);

    Object.setPrototypeOf(this, RequireSignInError.prototype);
  }
}
