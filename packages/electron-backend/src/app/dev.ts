import { app, BrowserWindow, globalShortcut, clipboard } from 'electron';
import { resolve } from 'path';
import { bindAppEvents } from './events';

export async function startDev() {
  // wait for electron
  await app.whenReady();

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    show: false,
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
  // mainWindow.webContents.openDevTools({
  //   mode: 'right',
  // });

  mainWindow.moveTop();
  mainWindow.focus();
  mainWindow.maximize();

  const ret = globalShortcut.register('CmdOrCtrl+Alt+T', () => {
    // Read the clipboard text
    const clipboardText = clipboard.readText();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      // Send the clipboard text to the renderer process
      mainWindow.webContents.send('clipboard-text', clipboardText);
      // Fade-in effect
      // let opacity = 0;
      // const fadeInInterval = setInterval(() => {
      //   opacity += 0.1;
      //   mainWindow.setOpacity(opacity);

      //   if (opacity >= 1) {
      //     clearInterval(fadeInInterval);
      //   }
      // }, 50); // Adjust the interval duration to control the animation speed
      mainWindow.show();
    }
  });

  if (!ret) {
    console.log('Global shortcut registration failed');
  }
}
