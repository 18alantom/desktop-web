const { ipcMain } = require('electron');

function registerActionListeners() {
  ipcMain.handle('create', (_, name) => {
    console.log('create', name);
    return true;
  });

  ipcMain.handle('read', () => {
    console.log('read');
    return true;
  });

  ipcMain.handle('update', (_, name, value) => {
    console.log('update', name, value);
    return true;
  });

  ipcMain.handle('delete', (_, name) => {
    console.log('delete', name);
    return true;
  });
}

module.exports = { registerActionListeners };
