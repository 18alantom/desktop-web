const { ipcMain } = require('electron');

function registerActionListeners(database) {
  ipcMain.handle('create', (_, name) => {
    return database.create(name)
  });

  ipcMain.handle('read', () => {
    return database.read()
  });

  ipcMain.handle('update', (_, name, value) => {
    return database.update(name, value)
  });

  ipcMain.handle('delete', (_, name) => {
    return database.delete(name)
  });
}

module.exports = { registerActionListeners };
