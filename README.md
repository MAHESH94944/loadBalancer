# Load Balancer Simulation

This project simulates a load balancer using algorithms like Las Vegas and Monte Carlo to distribute tasks across multiple servers. It includes a frontend for visualization and a backend for task assignment logic.

## Features

- **Task Assignment**: Assign tasks to servers using load balancing algorithms.
- **Visualization**: View server loads and task history in real-time.
- **Algorithms**: Implements Las Vegas and Monte Carlo algorithms for load balancing.
- **Responsive Design**: Frontend adapts to different screen sizes.

## Project Structure

```
load-balancer/
├── backend/
│   ├── loadBalancer.js   # Load balancing logic
│   ├── server.js         # Backend server
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── index.html        # Frontend HTML
│   ├── style.css         # Frontend CSS
│   └── script.js         # Frontend JavaScript
└── README.md             # Project documentation
```

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd load-balancer
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   node server.js
   ```

4. **Access the Frontend**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter a task name in the input field and click "Assign Task".
2. View the assigned server in the "Server Loads" section.
3. Check the task history and server load visualization.

## Algorithms

### Las Vegas Algorithm
- Randomly selects servers and assigns tasks to the least loaded one.
- Guarantees correct results with multiple attempts.

### Monte Carlo Algorithm
- Uses randomness to select servers and assigns tasks based on the lowest load.
- Runs multiple iterations to enhance the probability of optimal choice.

## Dependencies

### Backend
- `express`: Web framework for Node.js.
- `socket.io`: Real-time communication.
- `mongoose`: MongoDB object modeling.
- `jest`: Testing framework.
- `supertest`: HTTP assertions for testing.

### Frontend
- `Chart.js`: Visualization library for server loads.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Chart.js for data visualization.
- Socket.io for real-time communication.
