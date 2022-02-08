import React from "react";
import jwt from "jsonwebtoken";
import { createContext, useContext } from "react";
import API, { Routes } from "../../lib/api";

export interface Account {
  uid: string;
  jwt: string;

  username: string;
  discriminator: string;
  avatar: string;
  isAuthor: boolean;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  account?: Account;

  setUser: (uid: string, jwt: string) => Promise<void>;
  clearUser: () => void;
  hasChecked: boolean;

  loginCallback: (
    callback: (isAuthed: boolean, details?: Account) => void
  ) => void;

  removeLoginCallback: (
    callback: (isAuthed: boolean, details?: Account) => void
  ) => void;
  Api?: API;
};

export const AuthContext = createContext<AuthContextType>({
  setUser: (_: string, __: string, ___: boolean = true) =>
    new Promise<void>((_, __) => {}),
  isAuthenticated: false,
  clearUser: () => {},
  loginCallback: (_: (IsAuthed: boolean, details?: Account) => void) => {},
  removeLoginCallback: (
    _: (IsAuthed: boolean, details?: Account) => void
  ) => {},
  hasChecked: false,
  Api: undefined,
});

export const useAuth = () => useContext(AuthContext);

interface AuthenticationContextProps {}

interface AuthenticationContextState {
  account?: Account;
  hasChecked: boolean;
}

class AuthenticationContext extends React.Component<
  AuthenticationContextProps,
  AuthenticationContextState
> {
  public Api: API;
  private loginCallbacks: {
    callback: (IsAuthed: boolean, details?: Account) => void;
  }[] = [];
  private hasCheckedInternal: boolean = false;
  private _jwt: string | undefined;

  async componentDidMount() {
    if (!this.isAuthed) {
      await this.refreshToken();

      for (const callback of this.loginCallbacks) {
        callback.callback(this.state.account !== undefined, this.state.account);
      }
    }

    this.hasCheckedInternal = true;
    this.setState({ hasChecked: true });
  }

  public get isAuthed(): boolean {
    const isAuthed = this.state.account !== undefined;
    return isAuthed;
  }

  constructor(props: AuthenticationContextProps) {
    super(props);
    this.Api = new API(this);
    this.state = { hasChecked: false };
  }

  public async makeAuthedRequest(
    input: RequestInfo,
    init?: RequestInit,
    returnOn401: boolean = false
  ): Promise<Response> {
    const r = await fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        Authorization:
          this.state.account?.jwt || this._jwt
            ? `Bearer ${this.state.account?.jwt ?? this._jwt}`
            : "",
      },
    });

    if (
      r.status == 401 &&
      (await r.json())?.reason == "Invalid authorization"
    ) {
      if (returnOn401) {
        return r;
      }

      await this.refreshToken();

      return this.makeAuthedRequest(input, init, true);
    } else {
      return r;
    }
  }

  private async refreshToken() {
    const url = API.getRoute(Routes.Refresh);
    const r = await fetch(url, {
      credentials: "include",
    });

    if (!r.ok) {
      return;
    }

    const data = (await r.json()) as { token: string };

    const claims = jwt.decode(data.token) as {
      uid: string;
      exp: number;
      iat: number;
    };

    await this.setUser(claims.uid, data.token);
  }

  private setStateAsync(state: AuthenticationContextState) {
    return new Promise<void>((resolve) => {
      this.setState(state, resolve);
    });
  }

  private setUser = async (uid: string, jwt: string) => {
    this._jwt = jwt;
    const details = await this.Api.getCurrentUser();
    if (details) {
      await this.setStateAsync({
        ...this.state,
        account: {
          uid,
          jwt,
          ...details,
        },
      });
    } else {
      this._jwt = undefined;
      throw new Error("failed to get user details");
    }
  };

  private clearUser = async () => {
    await this.makeAuthedRequest(API.getRoute(Routes.Logout), {
      method: "POST",
      credentials: "include",
    });
    this._jwt = undefined;
    this.setState({ account: undefined });
  };

  public setLoginCallback = (callback: (IsAuthed: boolean) => void) => {
    if (this.hasCheckedInternal || this.state.hasChecked) {
      callback(this.isAuthed);
      return;
    }

    this.loginCallbacks.push({ callback });
  };

  public removeLoginCallback = (callback: (IsAuthed: boolean) => void) => {
    this.loginCallbacks = this.loginCallbacks.filter(
      (c) => c.callback !== callback
    );
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          isAuthenticated: this.isAuthed,
          clearUser: this.clearUser,
          loginCallback: this.setLoginCallback,
          Api: this.Api,
          removeLoginCallback: this.removeLoginCallback,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthenticationContext;
