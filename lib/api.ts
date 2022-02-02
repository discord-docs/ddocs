import AuthenticationContext from "../components/context/AuthContext";
import CurrentUser from "./api-models/currentUser";
import Event from "././api-models/event";
import PartialEvent from "./api-models/partialEvent";

export const BaseApiURL = "https://api.ddocs.io";

export const Routes = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  Refresh: "/auth/refresh",
  CurrentUser: "/users/@me",
  Events: "/events",
};

export default class API {
  private _context: AuthenticationContext;

  constructor(context: AuthenticationContext) {
    this._context = context;
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

  public async logout(): Promise<void> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.Logout)
    );

    if (!result.ok) this.handleUnknownError(result);
  }

  public async login(code: string): Promise<string | undefined> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.Login) + "?code=" + code
    );

    if (!result.ok) {
      this.handleUnknownError(result);
      return;
    }

    return (await result.json()).token;
  }

  public async getEvents(year: string): Promise<PartialEvent[]> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.Events) + "?year=" + year
    );

    if (!result.ok) {
      this.handleUnknownError(result);
      return [];
    }

    return (await result.json()) as PartialEvent[];
  }

  public async getEvent(id: string): Promise<Event | undefined> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.Events) + "/" + id
    );

    switch (result.status) {
      case 200:
        return (await result.json()) as Event;
      case 404:
        return undefined;
      default:
        this.handleUnknownError(result);
    }
  }

  public async searchEvents(query: string): Promise<PartialEvent[]> {
    const result = await this._context.makeAuthedRequest(
      API.getRoute(Routes.Events) + "?search=" + query
    );

    if (!result.ok) {
      this.handleUnknownError(result);
      return [];
    }

    return (await result.json()) as PartialEvent[];
  }

  public static getRoute(route: string) {
    return `${BaseApiURL}${route}`;
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
