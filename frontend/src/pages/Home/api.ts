import http from "../../lib/http";

export function loadReports() {
    return http.get(`/api/1.0/reports`, { params: { page: 0, size: 5, sort: "reportNumber,desc" } });
}

interface ReportBody {
    technicianId: number,
    patientIdentityNumber: string | number,
    patientFullName: string,
    diagnosisTitle: string,
    diagnosisDetails: string,
    reportDate: string | undefined,
    imagePath: string
}

export function saveReport(body: ReportBody) {
    return http.post(`/api/1.0/reports`, body)
}