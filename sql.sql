CREATE DATABASE adn_academy;
USE adn_academy;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    dob DATE NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    nationality VARCHAR(50),
    passing_certificate VARCHAR(255),
    admission_class TINYINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students
(first_name, last_name, dob, gender, father_name, mother_name, phone, email, address, city, state, nationality, passing_certificate, admission_class)
VALUES
(
    'Anjali',
    'Verma',
    '2011-03-22',
    'Female',
    'Ramesh Verma',
    'Sita Verma',
    '9876543211',
    'anjali@example.com',
    '456 Street',
    'Mumbai',
    'Maharashtra',
    'Indian',
    'uploads/certificate2.pdf',
    6
);

select * from students;

