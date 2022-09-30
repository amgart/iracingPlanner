const { app, ipcMain, BrowserWindow } = require("electron");
const Store = require("electron-store");

let appWin;
const store = new Store();

if (!store.get("clicks")) {
  store.set("clicks", 0);
}

createWindow = () => {
  appWin = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "iRacing Planner",
    resizable: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("message", (event) => event.reply("reply", "pong"));
