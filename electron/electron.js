const { app, BrowserWindow } = require('electron');
const { spawn, spawnSync } = require('child_process');
const path = require('path');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function createWindow() {
  spawn('npm run server', {
    shell: true,
    detached: true,
  });

  // const bat = spawnSync("npm install --prefix ReKuberate", {
  //   shell: true,
  //   detached: true,
  //   encoding: 'utf-8',
  // });

  // console.log(bat.stdout);
  // console.log(bat.stderr);

  // const server = spawn("npm run server --prefix ReKuberate", {
  //   shell: true,
  //   detached: true,
  //   encoding: 'utf-8',
  // });

  // server.stdout.on('data', function (data) {
  //   console.log('stdout: ' + data);
  // });
  // server.stderr.on('data', function (data) {
  //   console.log('stderr: ' + data);
  // });

  await delay(10000);

  const win = new BrowserWindow({ width: 1200, height: 800, title: 'ReKuberate' });
  win.removeMenu();
  win.webContents.openDevTools();
  win.loadURL('http://localhost:3001');
}

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(createWindow);

app.on('window-all-closed', app.quit);
