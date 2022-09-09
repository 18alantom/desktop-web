require('dotenv').config();
const { BrowserWindow, app, protocol } = require('electron');
const fs = require('fs');
const path = require('path');
const { registerActionListeners } = require('./actionListeners');
const { Database } = require('../backend-common/database');

const isDev = process.env.MODE === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    win.loadURL(`http://0.0.0.0:${process.env.VITE_PORT_FRONTEND}/`);
  } else {
    protocol.registerBufferProtocol('app', bufferProtocolCallback);
    win.loadURL('app://./index.html');
  }
}

const database = new Database(process.env.DB_PATH);
registerActionListeners(database);

app.whenReady().then(() => {
  createWindow();
});

function bufferProtocolCallback(request, respond) {
  const pathName = decodeURI(new URL(request.url).pathname);
  const filePath = path.join(__dirname, '..', pathName);

  fs.readFile(filePath, (_, data) => {
    const extension = path.extname(pathName).toLowerCase();
    const mimeType =
      {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
      }[extension] ?? '';

    respond({ mimeType, data });
  });
}
