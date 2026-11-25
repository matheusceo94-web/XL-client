const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let win;
const configPath = () => path.join(app.getPath('userData'), 'settings.json');
function readConfig() {
  try { return JSON.parse(fs.readFileSync(configPath(), 'utf8')); }
  catch { return { prismPath: '', instance: 'XL Client', ram: 4, accountMode: 'microsoft', offlineName: 'Jogador' }; }
}
function saveConfig(cfg) { fs.writeFileSync(configPath(), JSON.stringify(cfg, null, 2)); }

function createWindow() {
  win = new BrowserWindow({
    width: 900, height: 620, minWidth: 760, minHeight: 540,
    backgroundColor: '#101010',
    title: 'XL Launcher',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

ipcMain.handle('get-config', () => readConfig());
ipcMain.handle('save-config', (_, cfg) => { saveConfig(cfg); return true; });
ipcMain.handle('pick-prism', async () => {
  const result = await dialog.showOpenDialog(win, {
    title: 'Selecione o Prism Launcher',
    properties: ['openFile'],
    filters: [{ name: 'Executável', extensions: ['exe'] }]
  });
  return result.canceled ? null : result.filePaths[0];
});
ipcMain.handle('open-folder', async (_, folder) => {
  const target = folder === 'mods'
    ? path.join(process.env.APPDATA || '', '.minecraft', 'mods')
    : path.join(process.env.APPDATA || '', '.minecraft');
  fs.mkdirSync(target, { recursive: true });
  await shell.openPath(target);
});
ipcMain.handle('launch-game', async (_, cfg) => {
  if (!cfg.prismPath || !fs.existsSync(cfg.prismPath)) {
    return { ok: false, message: 'Selecione o arquivo prism-launcher.exe nas configurações.' };
  }
  if (!cfg.instance || !cfg.instance.trim()) {
    return { ok: false, message: 'Informe o nome da instância do Minecraft no Prism.' };
  }
  saveConfig(cfg);
  const args = ['--launch', cfg.instance.trim()];
  if (cfg.accountMode === 'offline') {
    const offlineName = String(cfg.offlineName || '').trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(offlineName)) {
      return { ok: false, message: 'Apelido offline inválido. Use de 3 a 16 caracteres: letras, números ou _.' };
    }
    args.push('--offline', offlineName);
  }
  const child = spawn(cfg.prismPath, args, { detached: true, stdio: 'ignore', windowsHide: false });
  child.on('error', () => {});
  child.unref();
  return { ok: true, message: cfg.accountMode === 'offline'
    ? 'XL Launcher iniciou o Prism em modo offline com o apelido escolhido.'
    : 'Prism Launcher iniciado. Se necessário, conclua o login Microsoft nele.' };
});
