# Full-Stack ToDo App

A modern, full-stack ToDo application featuring multiple todo lists, built with Spring Boot (Java), React (TypeScript), Docker, and PostgreSQL. Styled with a BMW M Performance-inspired theme.

## Features

- **Multiple Todo Lists**: Organize tasks into separate lists
- **CRUD Operations**: Create, read, update, and delete both todo lists and individual todos
- **Responsive UI**: Modern, mobile-friendly interface with BMW M Performance styling
- **Fast & Smooth**: Optimized React hooks for seamless list switching and updates
- **Backend API**: RESTful endpoints for todos and lists
- **Production-Ready**: Containerized with Docker Compose
- **Persistent Storage**: Uses PostgreSQL for data persistence
- **Easy Local Development**: Hot reload for both frontend and backend

## Tech Stack

- **Frontend**: React, TypeScript, CSS Modules
- **Backend**: Spring Boot, Java, JPA (Hibernate)
- **Database**: PostgreSQL (via Docker)
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose

### Quick Start
1. Clone the repository:
   ```sh
   git clone https://github.com/moneymikeMD/multi-todo-ai
   cd multi-todo-ai
   ```
2. Build and start all services:
   ```sh
   docker compose up --build
   ```
3. Open your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)
   - Database: Postgres running on port 5432 (user: `todo`, password: `todo`, db: `tododb`)

### Development
- **Frontend**: Edit files in `frontend/src/` and changes will hot-reload in Docker or with `npm start` locally.
- **Backend**: Edit files in `src/main/java/` and rebuild the backend container, or run with Maven locally.

## Project Structure
```
├── frontend/         # React frontend
├── src/              # Spring Boot backend source
├── Dockerfile.backend
├── docker-compose.yml
├── README.md
└── ...
```

## Customization & Extensibility
- Add features like due dates, priorities, or user authentication
- Swap out the database or add cloud deployment

## License
This project is open source and available under the MIT License. 