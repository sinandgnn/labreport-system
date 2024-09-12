import http from "../../lib/http";

interface LoginRequestBody {
    email: string;
    password: string;
}

export function login(body: LoginRequestBody){
    return http.post('/api/1.0/auth', body)
}