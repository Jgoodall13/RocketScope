# RocketScope

## Overview

**RocketScope** is a Rocket Launch Tracker and Simulator designed to:

- Simulate rocket dynamics such as altitude, velocity, and trajectory.
- Visualize telemetry data in real-time.
- Implement abort protocols based on range and safety conditions.
- Store and display historical launch data for analysis.

This project showcases full-stack development skills with a focus on real-time systems, complex calculations, and user-friendly interfaces.

---

## Technologies Used

### Frontend

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Socket.IO Client** for real-time communication
- **Leaflet** for map visualization
- **Chart.js** for telemetry data charts

### Backend

- **NestJS** with TypeScript
- **Prisma** ORM for database interactions
- **PostgreSQL** as the database
- **Socket.IO** for real-time updates
- **Class Validator** for input validation

### Tools

- **Git** for version control
- **GitHub** for code hosting
- **Vercel** (Frontend) and **Heroku** (Backend) for deployment

---

## Features

1. **Real-Time Dashboard**:

   - Displays rocket telemetry such as altitude, velocity, and fuel levels.
   - Visualizes rocket trajectory on an interactive map.

2. **Abort Protocol Simulation**:

   - Calculates when the rocket is out of range or unsafe and triggers an abort signal.

3. **Historical Data and Logs**:

   - Stores and displays past launches, telemetry, and abort conditions.

4. **Simulation Controls**:
   - Allows users to adjust launch parameters like angle, thrust, and fuel.

---

## Installation

### Prerequisites

- Node.js
- PostgreSQL
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RocketScope.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RocketScope
   ```
3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```
4. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```
5. Configure environment variables:

   - Create `.env` files in the backend and frontend directories with the necessary configurations (e.g., database connection, API URLs).

6. Start the applications:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd ../backend
     npm run start:dev
     ```

---

## Usage

1. Open the frontend in your browser (`http://localhost:3000`).
2. Use the dashboard to start a simulation, view telemetry, and monitor abort statuses.
3. Explore the historical data section for insights into previous launches.

---

## Roadmap

- [ ] Add real-world API integration for orbital data.
- [ ] Enhance trajectory prediction with advanced algorithms.
- [ ] Implement user authentication for multi-user functionality.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- The NestJS and Prisma communities for their excellent tools and resources.
- Open-source contributors for the libraries and frameworks used in this project.

---

**Happy coding! 🚀**
