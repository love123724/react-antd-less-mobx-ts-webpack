import React from 'react';

const context = {};

const stores = require.context('.', true, /Store$/);//匹配当前目录的所有包含Store关键词的文件

stores.keys().forEach(key => {//key的值为包含Store关键词文件的路径，值为./commonStore和./globalStore
    const name = key.match(/([a-zA-Z0-9].*)$/)[1];//值为commonStore，globalStore
    
    console.log(stores(key).default,'stores', )
    const Store = stores(key).default;//Store为一个伪类，包含上述匹配文件的所有代码
    context[name] = new Store();//创建一个类，用到的时候，可以直接调用方法和属性
});

export default context;