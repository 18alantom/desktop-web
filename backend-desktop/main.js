require('dotenv').config();
const { BrowserWindow, app } = require('electron');
const { join } = require('path');
const { registerActionListeners } = require('./actionListeners');
const { Database } = require('../backend-common/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  win.loadURL(`http://0.0.0.0:${process.env.VITE_PORT_FRONTEND}/`);
}

const database = new Database(process.env.DB_PATH);
registerActionListeners(database);

app.whenReady().then(() => {
  createWindow();
});
