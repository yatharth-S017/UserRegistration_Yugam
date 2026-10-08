# User Registration — Internship Assignment

A mobile-first responsive web application for user registration and validation built with React, Vite, and Firebase Authentication.

---

## Features

- User registration with Firebase Authentication (Email/Password)
- Prefilled user details page after registration
- Per-field client-side validation with inline error messages
- Route protection — details page is only accessible when authenticated
- Logout with Firebase `signOut`
- Responsive design (mobile-first)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI library |
| Vite | Build tool / dev server |
| JavaScript | Language |
| CSS | Styling |
| Firebase Authentication | User management |
| React Router | Client-side routing |

---

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Open your project → **Project Settings** → **Your apps**.
3. Copy the web app configuration values.
4. In Firebase Console → **Authentication** → **Sign-in method**, make sure **Email/Password** is **Enabled**.

---

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Never commit the `.env` file to Git.** It is already listed in `.gitignore`.

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Validation Rules

| Field | Rule |
|---|---|
| Name | Letters and spaces only (`/^[A-Za-z ]+$/`) |
| Password | At least one letter and one number |
| Mobile Number | Exactly 10 digits |
| Username | Letters, numbers, and at most one special character (`_`, `-`, `.`, `@`) |
| Email | Basic email format (`user@domain.tld`) |

---

## Project Structure

```
src/
├── components/
│   ├── InputField.jsx     # Reusable input with label and inline error
│   └── ProtectedRoute.jsx # Redirects unauthenticated users to /register
│
├── pages/
│   ├── Register.jsx       # Registration form
│   └── UserDetails.jsx    # Prefilled details + validation
│
├── firebase/
│   └── firebaseConfig.js  # Firebase init — reads from env vars
│
├── utils/
│   └── validation.js      # All validation functions
│
├── App.jsx                # Routes
├── main.jsx               # Entry point
└── index.css              # Global styles

.env                       # Your Firebase config (not committed)
.env.example               # Template for environment variables
.gitignore
README.md
```

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Registration | No |
| `/register` | Registration | No |
| `/details` | User Details | Yes |
