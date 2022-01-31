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
    Api?: API;
};

export const AuthContext = createContext<AuthContextType>({
    setUser: (_: string, __: string, ___: boolean = true) =>
        new Promise<void>((_, __) => {}),
    isAuthenticated: false,
    clearUser: () => {},
    loginCallback: (_: (IsAuthed: boolean, details?: Account) => void) => {},
    hasChecked: false,
    Api: undefined,
});

export const useAuth = () => useContext(AuthContext);

interface AuthenticationContextProps {}

interface AuthenticationContextState {
    account?: Account;
    loginCallback?: (isAuthed: boolean, details?: Account) => void;
    hasChecked: boolean;
}

class AuthenticationContext extends React.Component<
    AuthenticationContextProps,
    AuthenticationContextState
> {
    public Api: API;

    async componentDidMount() {
        if (!this.isAuthed) {
            const refresh = this.refreshCookie;

            if (!refresh) {
                this.state.loginCallback
                    ? this.state.loginCallback(false)
                    : undefined;
                this.setState({ hasChecked: true });
                return;
            }

            await this.refreshToken();
        }
    }

    public get isAuthed(): boolean {
        const isAuthed = this.state.account !== undefined;
        return isAuthed;
    }

    public get refreshCookie(): string | undefined {
        return (
            document.cookie
                .split(";")
                .find((c) => c.startsWith("r_"))
                ?.split("=")[1] ?? undefined
        );
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
            headers: { Authorization: "Bearer " + this.state.account?.jwt },
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
            throw new Error("failed to refresh token");
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
        const details = await this.Api.getCurrentUser();
        if (details) {
            await this.setState({
                ...this.state,
                account: {
                    uid,
                    jwt,
                    ...details,
                },
            });
        } else {
            throw new Error("failed to get user details");
        }
    };

    private clearUser = async () => {
        await fetch(API.getRoute(Routes.Logout), {
            method: "POST",
            credentials: "include",
        });

        this.setState({ account: undefined });
    };

    public setLoginCallback = (callback: (IsAuthed: boolean) => void) => {
        this.setState({ loginCallback: callback });
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
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthenticationContext;
