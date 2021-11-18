/*
 * @Author: your name
 * @Date: 2021-11-14 16:04:09
 * @LastEditTime: 2021-11-19 01:43:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/renderer/ipcRender.js
 */


const { ipcRenderer } = require('electron');

window.onload = function() {
    // const  btn = document.getElementById('btn')
    // const content = document.getElementById('content');

    // btn.onclick = function() {
    //     ipcRenderer.send('ipcRender-message','ping')
        
    // }

    // ipcRenderer.on('main-reply',(event,msg) => {
    //     content.innerHTML = msg;
    // })

    // // 接收主进程发来消息
    // ipcRenderer.invoke('main-message').then(res => {
    //     content.innerHTML = `${res}`
    //     console.log('res',res)
    // })

    // 请求数据
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET','https://cnodejs.org/api/v1/topics',true)
    // xhr.onload = function() {
    //     console.log(xhr.responseText)
    // }
    // xhr.send();

    //主进程获取数据
    const btn = document.getElementById('btn');
    btn.onclick = function() {
        ipcRenderer.send('ipcRender-main-data')
    }

    ipcRenderer.on('main-data-success',(event,msg) => {
        console.log('msg',msg)
    })
}