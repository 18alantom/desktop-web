const { BrowserWindow, app } = require('electron');
const { join } = require('path');
const {
  registerActionListeners,
} = require('./backend-desktop/actionListeners');
const { Database } = require('./backend-desktop/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 577,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: join(__dirname, 'backend-desktop', 'preload.js'),
    },
  });

  win.loadURL('http://0.0.0.0:3000/');
}

const database = new Database()
registerActionListeners(database);

app.whenReady().then(() => {
  createWindow();
});
