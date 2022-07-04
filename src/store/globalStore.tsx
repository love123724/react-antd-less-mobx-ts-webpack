/**
 * 全局状态管理
 */

import { makeAutoObservable, observable, action } from 'mobx';
// import request from '@/services/request';

interface IGlobalStore {
  appTitle?: string;
  collapsed: boolean;
  userInfo: any;
  toggleCollapsed(): void;
  [name: string]: any;
}

export default class GlobalStore implements IGlobalStore {
  constructor() {
    // mobx6.X 可以使用 makeAutoObservable 方法将对象属性设置为 observable state，将对象方法设置为 action 方法
    makeAutoObservable(this);
  }
  appTitle =  '管理平台';
  collapsed = false; // 菜单收起展开
  userInfo = {
    userName: 'Admin',
  };

  toggleCollapsed() {
    console.log('=====toggleCollapsed=======>>>', this);
    this.collapsed = !this.collapsed;
  }

  setData(data = {}) {
    Object.entries(data).forEach((item) => {
      this[item[0]] = item[1];
    });
  }

}
