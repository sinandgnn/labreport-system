import http from "../../lib/http";

export function loadReports(page: number = 0, sort: string = "reportDate,desc", search: string = "") {
    return http.get("/api/1.0/reports", { params: { page, size: 10, sort, search } });
}

export function deleteReport(id: number) {
    return http.delete(`/api/1.0/reports/${id}`)
}