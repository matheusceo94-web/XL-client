const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ns', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: cfg => ipcRenderer.invoke('save-config', cfg),
  pickPrism: () => ipcRenderer.invoke('pick-prism'),
  openFolder: folder => ipcRenderer.invoke('open-folder', folder),
  launchGame: cfg => ipcRenderer.invoke('launch-game', cfg)
});
