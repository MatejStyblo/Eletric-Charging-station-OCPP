const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') // Optional
        },
    });

    // Load the React app
    mainWindow.loadURL('http://localhost:3000');

    // Uncomment the next line to open DevTools
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
