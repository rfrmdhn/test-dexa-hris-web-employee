# Web Employee Portal

A modern employee portal web application built with React, TypeScript, and Vite.

## Tech Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Routing:** [React Router](https://reactrouter.com/)

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
   Modify `.env` if your backend services are running on different ports (default: Auth on 3001, Attendance on 3002).

## Running the Project

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

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
