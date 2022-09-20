import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { bindAppEvents } from './events';

export async function startProd() {
  // wait for electron
  await app.whenReady();

  const mainWindow = new BrowserWindow({
    width: 800, // customize to your app
    height: 600, // customize to your app
    transparent: false,
    frame: true, // hide or show frame around the window
    resizable: true,
    maximizable: true,
    alwaysOnTop: false,
    fullscreen: false,
    hasShadow: false,
    minimizable: true,
    closable: true,
    show: true,
    webPreferences: {
      webviewTag: false,
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: resolve(__dirname, '..', 'core', 'preload.js'),
    },
  });

  // load the index.html of the app.
  await mainWindow.loadFile('build/frontend/index.html');
  bindAppEvents(mainWindow);
}
