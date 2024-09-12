import axios from "axios";
import { i18nInstance } from "../locales";
import { loadToken, storeToken } from "../pages/shared/state/storage";

const http = axios.create();

interface AuthToken {
    prefix: string;
    token: string;
}

let authToken: AuthToken | null = loadToken();

export function setToken(token: AuthToken | null) {
    authToken = token;
    storeToken(token);
}

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18nInstance.language;
    if (authToken) {
        config.headers["Authorization"] = `${authToken.prefix} ${authToken.token}`;
    }
    return config;
});

export default http;