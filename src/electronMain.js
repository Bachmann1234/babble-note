const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const ipc = require("electron").ipcMain;
const { fork } = require("child_process");

const babbleWorker = fork("./src/work.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  win.loadURL(startUrl);
  win.webContents.openDevTools();
}
babbleWorker.once("message", (message) => {
  console.log(message);
});
babbleWorker.send("initializeDb");

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipc.on("hello", (event) => {
  babbleWorker.once("message", (message) => {
    event.sender.send("hello-reply", message);
  });
  babbleWorker.send("hello");
});
