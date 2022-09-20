import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { bindAppEvents } from './events';

export async function startDev() {
  // wait for electron
  await app.whenReady();

  const mainWindow = new BrowserWindow({
    frame: true,
    show: true,
    webPreferences: {
      webviewTag: false,
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: resolve(__dirname, '..', 'core', 'preload.js'),
    },
  });

  // load the index.html of the app
  await mainWindow.loadURL('http://localhost:3000');
  bindAppEvents(mainWindow);

  // open the DevTools
  mainWindow.webContents.openDevTools({
    mode: 'right',
  });

  mainWindow.moveTop();
  mainWindow.focus();
  mainWindow.maximize();
}
