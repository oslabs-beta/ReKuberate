const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 800 });
  win.removeMenu();

  win.loadURL('http://localhost:3001');
}

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(createWindow);

app.on('window-all-closed', app.quit);
