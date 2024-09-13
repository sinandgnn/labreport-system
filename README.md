
![Logo](https://static.sinandgn.com/logo.png)


# LabReport System

LabReport System is a web application that allows you to easily create, edit, and manage laboratory reports. This project is built using React with Mantine for the frontend and Spring Boot for the backend.
## Features

- **Technician Authentication**: Login with email and password.
- **Report Management**: Create, edit, and delete reports with detailed information including file number, patient’s full name, patient ID (T.C.), diagnosis title, diagnosis details, report date, and a photo.
- **Search and Sort Reports**: Search reports by patient name, ID, and technician name, and sort them for convenience.
- **Technician Management**: Add technicians in the system. Each report must be assigned to a single technician, though a technician can create multiple reports.
- **Multilingual Support**: Supports multiple languages (Turkish and English).
- **Error Handling**: Form validation and global error messages.
- **Light/Dark Mode**: Switch between dark and light themes.

## Deployment

Access the live version of the website at [labreport.sinandgn.com](http://labreport.sinandgn.com).

If the backend is down or the frontend is unreachable, you can still view the static version of the site at [static.sinandgn.com](http://static.sinandgn.com), which works without a backend connection.

## Tech Stack

**Client:**
- React, Mantine UI, Redux Toolkit, TypeScript

**Server:**
- Java, Spring Boot, PostgreSQL

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`


Sample .env file:
   
    DB_URL=jdbc:postgresql://localhost:5432/labreportdb
    DB_USERNAME=postgres
    DB_PASSWORD=123456


## Run Locally

Clone the project

```bash
  git clone https://github.com/sinandgnn/labreport-system.git
```

Go to the project directory

```bash
  cd labreport-system
```

### Frontend

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Backend

Open another terminal and navigate to the labreport-system folder

```bash
  cd backend
```

Install dependencies

```bash
  mvn install -DskipTests
```

Start the server

```bash
  mvn spring-boot:run
```

---

A default admin technician is created when the application starts:

Email: admin@mail.com

Password: admin

---

## API Reference

### Authentication APIs

#### Login
```http
POST /api/1.0/auth
```
Logs in a technician using their email and password.

| Parameter  | Type     | Description              |
|------------|----------|--------------------------|
| email      | string   | Required. Technician's email    |
| password   | string   | Required. Technician's password |

---

### Report APIs

#### Get All Reports
```http
GET /api/1.0/reports
```
Fetches a list of all lab reports.

| Parameter | Type    | Description                        |
|-----------|---------|------------------------------------|
| page      | int     | Optional. Page number for pagination |
| size      | int     | Optional. Number of reports per page |
| sort      | string  | Optional. Sort by specific field (e.g., reportDate, reportNumber; asc or desc) |
| search    | string    | Optional. Search by report number, technician or patient |

#### Get Report by ID
```http
GET /api/1.0/reports/{id}
```
Fetches the details of a specific report by its ID.

| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| id        | long    | Required. ID of the report to fetch |

#### Create New Report
```http
POST /api/1.0/reports
```
Creates a new lab report.

| Parameter      | Type     | Description                               |
|----------------|----------|-------------------------------------------|
| technicianId	 | long     | Required. ID of the technician creating the report
| patientIdentityNumber      | long   | Required. Patient's identity number (T.C.)                |
| patientFullName      | string   | Required. Full name of the patient                |
| diagnosisTitle      | string   | Required. Title of the diagnosis               |
| diagnosisDetails      | string   | Required. Detailed description of the diagnosis |
| reportDate     | string   | Required. Date of the report (yyyy-MM-dd)  |
| imagePath     | string   | Required. Image path of the report  |

#### Update Report
```http
PUT /api/1.0/reports/{id}
```
Updates an existing report.

| Parameter      | Type     | Description                               |
|----------------|----------|-------------------------------------------|
| diagnosisTitle      | string   | Optional. Diagnosis title                |
| diagnosisDetails      | string   | Optional. Diagnosis details   

#### Delete Report
```http
DELETE /api/1.0/reports/{id}
```
Deletes a specific report by its ID.

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| id        | long   | Required. ID of the report to delete |

---

### Technician APIs

#### Get All Technicians
```http
GET /api/1.0/technicians
```
Fetches a list of all technicians.

| Parameter | Type  | Description                        |
|-----------|-------|------------------------------------|
| page      | int   | Optional. Page number for pagination |
| size      | int   | Optional. Number of technicians per page |
| search    | string    | Optional. Search by full name, hospital ID number or email |

#### Create New Technician
```http
POST /api/1.0/technicians
```
Creates a new technician.

| Parameter  | Type     | Description                  |
|------------|----------|------------------------------|
| fullName   | string   | Required. Technician's full name |
| email      | string   | Required. Technician's email    |
| password   | string   | Required. Technician's password |
| isAdmin   | boolean   | Required. Whether the technician has admin permissions  |

---
## Support

For support, you can send an e-mail to sinandgn00@gmail.com.

