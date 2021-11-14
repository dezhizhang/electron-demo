/*
 * @Author: your name
 * @Date: 2021-11-14 16:31:28
 * @LastEditTime: 2021-11-14 16:34:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/renderer/nodejs.js
 */
const fs = require('fs');
const path = require('path');

//读取文件
window.onload = function() {
    const btn = document.getElementById('btn');
    const content = document.getElementById('content');
    btn.onclick = async function() {
        const res = await fs.readFileSync(__dirname + path.join('/index.html'));
        console.log('res',res)
        content.innerHTML = `${res}`;
    }
}