import http from "../../lib/http";

export function getReport(id: number) {
    return http.get(`/api/1.0/reports/${id}`)
}

interface UpdateBody {
    diagnosisTitle: string,
    diagnosisDetails: string
}

export function updateReport(id: number, body: UpdateBody) {
    return http.put(`/api/1.0/reports/${id}`, body)
}