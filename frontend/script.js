const socket = io();
let taskHistory = []; 

const servers = [
  { id: "Server 1", port: 3001 },
  { id: "Server 2", port: 3002 },
  { id: "Server 3", port: 3003 },
  { id: "Server 4", port: 3004 },
  { id: "Server 5", port: 3005 },
];

function getTwoRandomServers() {
  const firstIndex = Math.floor(Math.random() * servers.length);
  let secondIndex;

  do {
    secondIndex = Math.floor(Math.random() * servers.length);
  } while (secondIndex === firstIndex);

  return [servers[firstIndex], servers[secondIndex]];
}

document.getElementById("assignButton").onclick = () => {
  const taskName = document.getElementById("taskInput").value;
  if (taskName) {
    socket.emit("assignTask", taskName);
    document.getElementById("taskInput").value = "";
  }
};

socket.on("taskAssigned", (data) => {
  const serverLoads = document.getElementById("serverLoads");
  const [server1, server2] = getTwoRandomServers();

  const load1 = Math.floor(Math.random() * 100);
  const load2 = Math.floor(Math.random() * 100);

  let assignedServer;
  if (load1 <= load2) {
    assignedServer = server1;
  } else {
    assignedServer = server2;
  }

  const li = document.createElement("li");
  li.textContent = `Assigned ${data.task} to ${assignedServer.id} (Port: ${assignedServer.port})`;
  serverLoads.appendChild(li);


  taskHistory.push({
    task: data.task,
    server: `${assignedServer.id} (Port: ${assignedServer.port})`, 
    timestamp: new Date(),
  });
  updateTaskHistory();
  updateLoadChart(server1, server2, load1, load2, assignedServer);
});


function updateTaskHistory() {
  const taskHistoryList = document.getElementById("taskHistory");
  taskHistoryList.innerHTML = ""; 
  taskHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.timestamp.toLocaleString()}: Assigned ${
      entry.task
    } to ${entry.server}`;
    taskHistoryList.appendChild(li);
  });
}


const ctx = document.getElementById("loadChart").getContext("2d");
let loadChart;

function updateLoadChart(server1, server2, load1, load2, assignedServer) {
  const serverLoadData = {
    [`${server1.id} (Port: ${server1.port})`]: load1,
    [`${server2.id} (Port: ${server2.port})`]: load2,
  };

  if (loadChart) {
    loadChart.destroy(); 
  }

  loadChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(serverLoadData),
      datasets: [
        {
          label: "Server Load",
          data: Object.values(serverLoadData),
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

document.getElementById("toggleAlgorithms").onclick = () => {
  const algorithmDetails = document.getElementById("algorithmDetails");
  if (algorithmDetails.style.display === "none") {
    algorithmDetails.style.display = "block";
    document.getElementById("toggleAlgorithms").textContent = "Hide Algorithms";
  } else {
    algorithmDetails.style.display = "none";
    document.getElementById("toggleAlgorithms").textContent = "Show Algorithms";
  }
};
