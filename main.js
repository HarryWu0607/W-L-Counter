// Import Electron modules
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 450, // Window width
    height: 750, // Window height
    resizable: false, 
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration inside the Electron app
      contextIsolation: false, // Disable context isolation for simplicity
    },
  });

  // Load the React app from the frontend build
  win.loadFile(path.join(__dirname, "frontend/dist/index.html"));

//   // Open Developer Tools (optional, for debugging)
//   win.webContents.openDevTools();
}

// Create the window when the app is ready
app.whenReady().then(createWindow);

// Close the app when all windows are closed (except for Mac)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
