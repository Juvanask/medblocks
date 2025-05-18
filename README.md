# frontend-only patient registration app

This is a simple frontend-only patient registration app system built with React and Tailwind CSS. It helps manage patient records including registration, listing, querying, and bulk uploads through Excel files.

---

## Features

- Register new patients with name, age, gender, and address  
- View and manage a list of all registered patients  
- Run SQL queries to filter and analyze patient data  
- Upload patient data in bulk using Excel files  

---

## Basic Project Structure

/src
/components
/PatientForm - Form to add a new patient
/PatientList - List view of all patients
/QueryForm - SQL query form
/ExcelUpload - Upload patients using Excel
/Header - App header
/Footer - App footer
/Section - Layout wrapper
/Navigation - Navigation bar
/services
dbService.js - Handles database operations
/styles
index.css
tailwind.css
App.js
index.js


---

## Prerequisites

Make sure you have the following installed:

- Node.js  
- npm
- Git

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Juvanask/medblocks.git
cd patient_registration


### 2. Install Dependencies
- npm install

### 3. Run the Application 
- npm start


Then open your browser and visit:
http://localhost:3000


## Usage Instructions

### Register New Patients

- Navigate to the Register New Patient page  
- Fill out the form with patient details  
- Click on Register Patient to add them to the system  

### View Patient List

- Go to the Patient List section  
- Use the search bar to find patients by name  
- Sort patients by name or age using the dropdown  

### Query Patients

- Navigate to the Search / Query Patients page  
- Enter your SQL query in the textarea  
- Click Execute Query to see the filtered results  

### Upload Patient Data via Excel

- Go to the Register New Patient section  
- Scroll down to Bulk Upload via Excel  
- Upload an Excel file containing patient details  
- Click Upload Patients to import the data  

### Excel Upload Format

The Excel file should have the following columns:

| name         | age | gender | address           |
|--------------|-----|--------|-------------------|
| John Doe     | 35  | Male   | 123 Main Street   |
| Jane Smith   | 28  | Female | 456 Elm Avenue    |

i will attach an sample excel sheet in the mail as wel as in this project as sample-patients.xlsx in the "sample" folder

---



Created for Medblocks
