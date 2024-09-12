import http from "../../lib/http";

export function loadTechnicians(page: number = 0, search: string = "") {
    return http.get("/api/1.0/technicians", { params: { page, size: 5, search, sort: "id,desc" } });
}

interface TechnicianBody {
    fullName: string,
    email: string,
    password: string,
    admin: boolean
}

export function saveTechnician(body: TechnicianBody) {
    return http.post("/api/1.0/technicians", body);
}