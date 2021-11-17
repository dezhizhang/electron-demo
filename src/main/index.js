/*
 * @Author: your name
 * @Date: 2021-11-14 16:06:07
 * @LastEditTime: 2021-11-17 22:29:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/main.js
 */
const fs = require('fs')
const URL = require("url");
const { app, BrowserWindow, ipcMain, globalShortcut,screen,navigator, webContents,powerMonitor } = require("electron");
const path = require("path");
const { double } = require("cli-boxes");
require("./menu.js");

let win = null;

async function createWindow() {
    // 获取扩展屏的信息
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    });

    if(externalDisplay) {
        win = new BrowserWindow({
            //kiosk:true,
            x:externalDisplay.bounds.x + 50,
            y:externalDisplay.bounds.y + 50,
            webPreferences:{
                nodeIntegration:true,
                contextIsolation:false,
            }
        });
        win.webContents.openDevTools();
        // 打印机
        // win.webContents.print({
        //     silent:false,
        //     printBackground:true,
        //     deviceName:''
        // },(success,error) => {
        //     console.log('success',success)
        //     console.log('error',error)
        // })

        // //导出pdf
        // const data = await win.webContents.printToPDF({});
        // let filePath = './public/index.pdf'
        // fs.writeFile(filePath,data,error => {
        //     console.log(error)
        // });

        // 电源
        // console.log(powerMonitor.getSystemIdleState(10))
        
        win.loadFile("./public/index.html");
    }
}






app.on("ready", createWindow);

// ipc通信
// 主进程主动向渲染进程发消息
ipcMain.handle("main-message", async () => {
  return new Promise((resolve, reject) => {
    resolve("ok");
  });
});

// 接收渲染进程发来的消息
ipcMain.on("ipcRender-message", (event, msg) => {
  console.log("msg", msg);
  event.reply("main-reply", "pong");
});

app.on("window-all-closed", () => {
  app.quit();
});
