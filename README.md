# Employee Tracker

## 📋 Description

A command-line application for managing a company's employee database using **Node.js**, **Inquirer**, and **PostgreSQL**.

This tool allows business owners and team leads to view and manage departments, roles, and employees from the terminal, making it easier to organize and plan company structure.

## 🧠 User Story

```
AS a business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business  
```

## ✅ Features

- View all departments  
- View all roles  
- View all employees  
- Add a department  
- Add a role  
- Add an employee  
- Update an employee’s role  

## 🛠️ Technologies Used

- Node.js  
- Inquirer (v8.2.4)  
- PostgreSQL  
- pg (PostgreSQL client for Node.js)  
- dotenv  

## 🗃️ Database Schema

- **department**: `id`, `name`  
- **role**: `id`, `title`, `salary`, `department_id`  
- **employee**: `id`, `first_name`, `last_name`, `role_id`, `manager_id`  

## 🎥 Walkthrough Video

[👉 Click here to watch the demo](https://app.screencastify.com/v3/watch/eNh4evSJBfmStVEi9305)



## Author

- [Chris Munoz](https://github.com/Fadedsetton)

© 2025 | Chris Munoz
