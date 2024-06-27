const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./renderer/index.html')
    // Open the DevTools.
    win.webContents.openDevTools();

}
ipcMain.on('save-chemical', (event, chemical) => {
    const filePath = path.join(app.getPath('userData'), 'chemicals.json');
    let chemicals = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        chemicals = JSON.parse(data);
    }

    chemicals.push(chemical);

    fs.writeFileSync(filePath, JSON.stringify(chemicals, null, 2));
});
ipcMain.on('request-chemicals', (event) => {
    const filePath = path.join(app.getPath('userData'), 'chemicals.json');
    let chemicals = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        chemicals = JSON.parse(data);
    }


    event.sender.send('load-chemicals', chemicals);
});
ipcMain.on('delete-chemical', (event, index) => {
    const filePath = path.join(app.getPath('userData'), 'chemicals.json');
    let chemicals = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        chemicals = JSON.parse(data);
    }

    chemicals.splice(index, 1); // Remove the chemical at the given index

    fs.writeFileSync(filePath, JSON.stringify(chemicals, null, 2));

    event.sender.send('load-chemicals', chemicals);
});

app.whenReady().then(() => {
    createWindow()
})