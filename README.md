# Candidate Management - Frontend

React application for managing candidates and their skills.

## Technologies

- React
- TypeScript
- Vite

## Features

- Display candidates list
- Create candidate
- Update candidate
- Delete candidate
- Add skills to candidate
- Remove skills from candidate
- Search candidates by full name
- Search candidates by skill
- Reset search

## Running the application

```bash
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## Most interesting part

The frontend communicates with the Spring Boot backend through REST API endpoints. Search inputs update the results dynamically without requiring a page reload. A dedicated input is provided for searching by skill, along with a reset option that restores the full candidate list.
