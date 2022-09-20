import { app, BrowserWindow, ipcMain } from 'electron';

// add events to communicate with electron process from the frontend (react)
export async function bindAppEvents(mainWindow: BrowserWindow) {
  mainWindow.once('ready-to-show', () => {
    ipcMain.on('focus', (e, message) => {
      // send a response to frontend
      BrowserWindow.fromWebContents(e.sender).webContents.send(
        'focus',
        message,
      );
    });

    ipcMain.on('exit', (e) => {
      app.quit();
    });
  });
}
