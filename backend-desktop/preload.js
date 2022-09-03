const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
  async create(name) {
    return await ipcRenderer.invoke('create', name);
  },

  async update(name, value) {
    return await ipcRenderer.invoke('update', name, value);
  },

  async read() {
    return await ipcRenderer.invoke('read');
  },

  async delete(name) {
    return await ipcRenderer.invoke('delete', name);
  },
});
