# Web Employee Portal

A modern employee portal web application built with React 19, TypeScript, and Vite, designed to interface with the Dexa HRIS microservices.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Utils:** [Date-fns](https://date-fns.org/), [React Webcam](https://www.npmjs.com/package/react-webcam)

## Features

- **Authentication**: secure login for employees.
- **Dashboard**: Overview of attendance stats and activities.
- **Attendance**:
    - **Check-In**: Capture photo verification using the device camera.
    - **Check-Out**: Simple one-click checkout.
    - **History**: View past attendance records with details.
- **Responsive Design**: Mobile-first approach for on-the-go usage.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup & Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/rfrmdhn/test-dexa-hris-web-employee.git
   cd web-employee
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file to create your local configuration:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` to point to your running microservices:
   ```env
   # Service URLs
   VITE_AUTH_SERVICE_URL=http://localhost:3001
   VITE_ATTENDANCE_SERVICE_URL=http://localhost:3002
   ```

## Running the Project

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build:
```bash
npm run build
```
The built files will be in the `dist` directory.

You can preview the production build locally using:
```bash
npm run preview
```

## Linting

To run the linter:
```bash
npm run lint
```
