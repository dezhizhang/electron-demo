/*
 * @Author: your name
 * @Date: 2021-11-14 16:06:07
 * @LastEditTime: 2021-11-17 19:40:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/main.js
 */
const URL = require('url');
const {app,BrowserWindow,ipcMain}  = require('electron');
const path = require('path');

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width:600,
        height:800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });
    win.webContents.openDevTools();
    // url = URL.format({
    //     pathname:path.join(__dirname,'index.html'),
    //     protocol:'file'
    // })
    win.loadFile('./public/index.html')
    //win.loadFile('./public/nodejs.html')
    // win.loadFile(url)
}


app.on('ready',createWindow)


// ipc通信
// 主进程主动向渲染进程发消息
ipcMain.handle('main-message',async() => {
    return new Promise((resolve,reject) => {
        resolve('ok')
    })
});

// 接收渲染进程发来的消息
ipcMain.on('ipcRender-message',(event,msg) => {
    console.log('msg',msg);
    event.reply('main-reply','pong')
})


app.on('window-all-closed',() => {
    app.quit();
})