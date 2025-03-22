class Server {
  constructor(port) {
    this.port = port;
    this.taskCount = 0;
  }

  assignTask() {
    this.taskCount++;
  }

  getLoad() {
    return this.taskCount;
  }
}

class LoadBalancer {
  constructor(numOfServers) {
    this.servers = [];
    for (let i = 0; i < numOfServers; i++) {
      this.servers.push(new Server(8000 + i));
    }
  }

  assignTaskMonteCarlo(task) {
    let iterations = 10; 
    let leastLoadedServer = null;
    let minLoad = Infinity;

    for (let i = 0; i < iterations; i++) {
      const server = this.getRandomServer();
      const load = server.getLoad();

      if (load < minLoad) {
        minLoad = load;
        leastLoadedServer = server;
      }
    }

    leastLoadedServer.assignTask();
    return leastLoadedServer.port;
  }

  
  assignTaskLasVegas(task) {
    let foundServer = false;
    let attempts = 0;

    while (!foundServer && attempts < 10) {
      
      const server = this.getRandomServer();
      const load = server.getLoad();

      if (load < 2) {
        
        server.assignTask();
        foundServer = true;
        return server.port;
      }
      attempts++;
    }

    
    const leastLoadedServer = this.servers.reduce((prev, curr) => {
      return prev.getLoad() < curr.getLoad() ? prev : curr;
    });

    leastLoadedServer.assignTask();
    return leastLoadedServer.port;
  }

  assignTask(task) {
    return this.assignTaskLasVegas(task);
  }

  getRandomServer() {
    const randomIndex = Math.floor(Math.random() * this.servers.length);
    return this.servers[randomIndex];
  }

  getServerLoads() {
    return this.servers.map((server) => ({
      port: server.port,
      load: server.getLoad(),
    }));
  }
}

module.exports = LoadBalancer;
