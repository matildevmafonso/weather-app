const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");

app.disableHardwareAcceleration();

function createWindow() {
  // Start the server
  const server = spawn("node", ["index.js"]);
  server.stdout.on("data", (data) => {
    console.log(`server: ${data}`);
  });
  server.stderr.on("data", (data) => {
    console.error(`server error: ${data}`);
  });
  server.on("close", (code) => {
    console.log(`server exited with code ${code}`);
  });

  const win = new BrowserWindow({
    width: 450,
    height: 525,
    title: "Weather App",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Wait a tiny bit for the server to be ready, then load
  setTimeout(() => {
    win.loadURL("http://localhost:3000");
  }, 1000);

  app.on("window-all-closed", () => {
    server.kill();
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);
