const { BrowserWindow, app } = require('electron');
const { join } = require('path');
const {
  registerActionListeners,
} = require('./backend-desktop/actionListeners');

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

registerActionListeners();

app.whenReady().then(() => {
  createWindow();
});
