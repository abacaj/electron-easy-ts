import { contextBridge, ipcRenderer } from 'electron';

const events = {
  send: (channel, ...data) => ipcRenderer.send(channel, ...data),
  remove: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  receive: (channel, func) => {
    // handle response from electron to frontend
    const listener = (event, ...args) => {
      func.apply(null, args);
    };

    ipcRenderer.on(channel, listener);
  },
};

contextBridge.exposeInMainWorld('electron', events);
