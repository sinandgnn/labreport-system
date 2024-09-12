export interface Report {
    reportNumber: number;
    technician: Technician;
    patient: Patient;
    diagnosisTitle: string;
    diagnosisDetails: string;
    reportDate: string;
    imagePath: string;
}

export interface Technician {
    fullName: string;
    email: string;
    hospitalIdentityNumber: number;
    admin: boolean;
}

export interface Patient {
    fullName: string;
    identityNumber: number;
}