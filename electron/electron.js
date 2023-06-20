/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// Start server and at app startup
async function createWindow() {
  spawn('npm run server', {
    shell: true,
    detached: true,
  });

  await delay(10000);

  const win = new BrowserWindow({ width: 1200, height: 800, title: 'ReKuberate' });
  win.removeMenu();
  win.loadURL('http://localhost:3001');
}

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(createWindow);

app.on('window-all-closed', app.quit);
