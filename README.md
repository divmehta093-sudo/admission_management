# Student Management System

A full-stack web application for managing student records. This system allows administrators to log in, access a dashboard, and manage student information through a simple and user-friendly interface.

---

## Features

* Admin login authentication
* Dashboard for managing data
* Student record management
* Add and view student details
* Clean and simple user interface

---

## Tech Stack

| Layer    | Technology Used     |
| -------- | ------------------- |
| Frontend | HTML, CSS           |
| Backend  | Node.js, Express.js |
| Database | SQL (MySQL)         |

---

## Project Structure

```
├── admin_login.html     # Admin login page
├── dashboard.html       # Dashboard interface
├── index.html           # Home page
├── student.html         # Student details page
├── student_form.css     # Styling for forms
├── server.js            # Backend server
├── sql.sql              # Database schema
├── package.json         # Dependencies
├── package-lock.json    # Dependency lock file
├── launch.json          # Debug configuration
├── logo.png             # Logo image
├── student.webp         # Image asset
```

---

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/your-username/your-repository-name.git
```

### 2. Navigate to the Project Folder

```
cd your-repository-name
```

### 3. Install Dependencies

```
npm install
```

### 4. Setup Database

* Import the `sql.sql` file into your database
* Update database credentials in `server.js`

### 5. Run the Application

```
node server.js
```

### 6. Open in Browser

```
http://localhost:3000
```

---

## Configuration

Ensure the database connection details in `server.js` are correct:

* Database name
* Username
* Password
* Host

---

## Future Improvements

* Edit and delete student records
* Search and filtering functionality
* Improved authentication system
* Deployment to cloud platforms

---

## Author

Divya Mehta
https://github.com/divmehta093-sudo
---

## License

This project is licensed under the MIT License.
