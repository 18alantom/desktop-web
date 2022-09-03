const { BrowserWindow, app } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 577,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://0.0.0.0:3000/');
}

app.whenReady().then(() => {
  createWindow();
});
