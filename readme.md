# Email Receiving Chain & ESP Detection System

A full-stack application that automatically identifies the **receiving chain** and **ESP (Email Service Provider) type** of any incoming email to a generated test address. The system processes and displays email header data in a clean, user-friendly dashboard.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Architecture & Tech Stack](#architecture--tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [UI/UX Details](#uiux-details)  
- [Folder Structure](#folder-structure)   
- [References](#references)  

---

## Overview

Emails contain intricate header data revealing the path (receiving chain) they followed and the service used to send them (ESP). This project:

- Generates a test email address for sending emails.
- Automatically fetches and parses incoming emails via backend.
- Extracts and stores email receiving chain and ESP type.
- Presents results in an intuitive, responsive React js frontend dashboard.

---

## Features

- Auto-detection of receiving chain servers from email headers  
- Identification of sender's ESP (Gmail, Outlook, Amazon SES, Zoho, etc.)  
- Responsive, mobile-friendly dashboard for easy visualization  
- Storage of raw and processed email data using MongoDB  
- Clean API built with Node.js and NestJS for robust backend processing  
- Live email fetch and processing with email parsing library  

---

## Architecture & Tech Stack

| Component   | Technology          | Description                                        |
| ----------- | ------------------- | ------------------------------------------------ |
| Frontend    | React.js   | Responsive UI to display email data               |
| Backend     | Node.js + NestJS    | API to receive, parse, and store email information|
| Database    | MongoDB             | Persist raw and processed email metadata          |
| Email Parsing | mailparser         | Parses raw email content to extract headers        |
| External API| Testmail API        | Source of incoming test emails                      |

---

## Setup & Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/email-receiving-chain.git
```

2. Navigate to the backend directory and install dependencies:

```bash
cd server
npm install
```
3. Create `.env` in the backend directory with environment variables (see [Environment Variables](#environment-variables)).

4. Start the backend server:

```bash
npm run dev
```

5. In a separate terminal, navigate to the frontend directory and install dependencies:

```bash
cd client
npm install
```
6. Create `.env` in the frontend directory ,Setup the Base URL
 (see [Environment Variables](#environment-variables)).

7. Start the frontend server:

```bash
npm run dev
```

8. Navigate to [http://localhost:5173](http://localhost:5173) in your browser.


## Environment Variables

### Backend Environment Variables

- **MONGODB_URI**: MongoDB connection string  
- **TESTMAIL_API_KEY**: API key from Testmail for fetching emails  
- **TESTMAIL_NAMESPACE**: Namespace or inbox identifier for Testmail  

### Frontend Environment Variables


- **VITE_API_BASE_URL**: Base URL  for fetch backend data 



---

## Usage

1. Navigate to [http://localhost:5173](http://localhost:5173) in your browser.
2. Send an email to the generated test address.
3. Click the "Fetch Emails" button.
4. Wait for the emails to be fetched and processed.
5. The dashboard will display the all email data.
6. Click on an email to view its details.

---

## API Endpoints

The backend API provides the following endpoints:

- `/emails`: Fetches and processes incoming emails.
- `/emails/:id`: Retrieves a specific email by ID.

---

## UI/UX Details

- Responsive design for optimal user experience on various devices.
- Clean and user-friendly interface for easy navigation.
- Interactive dashboard for easy visualization of email data.

---


## Folder Structure

The project is structured as follows:

```bash
.
├── client
│   ├── public
│   ├── src
│   └── package.json
├── server  
│   ├── src
│   ├── jsconfig.json
│   └── package.json
├── README.md
```



## References

- [mailparser](https://github.com/andris9/mailparser)
- [Testmail](https://testmail.io/)






