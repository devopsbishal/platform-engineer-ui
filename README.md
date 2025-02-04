# Frontend Project Setup Guide

This document provides step-by-step instructions for setting up and running the frontend of the project. Please ensure you've followed the backend setup instructions in the [backend README.md](./backend/README.md) before proceeding.

## Prerequisites

1. **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the [official Node.js website](https://nodejs.org/).
2. **Backend API Running:** Make sure the backend API is up and running. Refer to the backend setup guide for instructions.

## Project Setup

1. **Clone the Repository:** Clone the frontend repository to your local machine using:

   ```bash
   git clone <repository-url>
   cd <frontend-project-directory> 
   ```

2. **Install Dependencies:** Install the project dependencies using npm:

   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the root directory of your frontend project.
   - Add the following environment variables, replacing the placeholders with your actual values:

     ```
     REACT_APP_API_BASE_URL=http://localhost:4000   // Replace with your backend API URL
     ```

4. **Start the Development Server:**

   ```bash
   npm run dev 
   ```

   This command will start the development server, typically at  `http://localhost:3000` (or a different port specified in your configuration). You should now be able to access the frontend application in your web browser.

## Available Scripts

- **`npm start` or `npm run dev`:** Starts the development server.
- **`npm run build`:** Builds the production-ready build of your frontend application.
- **`npm run lint`:** Runs the linter to check for code style and potential errors.

## Additional Notes:

- Ensure that the frontend is configured to communicate with the correct port where your backend API is running. 
- Consult the documentation for the specific frontend framework you are using (e.g., React, Vue.js, Angular) for framework-specific configurations or optimizations.
