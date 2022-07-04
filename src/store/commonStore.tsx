import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import request from '@/utils/request';

export default class CommonStore {
  constructor() {
    // mobx6.X 可以使用 makeAutoObservable 方法将对象属性设置为 observable state，将对象方法设置为 action 方法
    makeAutoObservable(this);
  }

  loading: boolean = false;
  repeatSubmit: boolean = false;

  resetRepeatSubmit = (repeatSubmit:boolean) => {
    this.repeatSubmit = repeatSubmit
  };
   async login(formData:any, callBack:any){
     const res = await request({
      url: 'user/login.json',
      method: 'GET',
      params: { ...formData },
     })
     message.success('登录成功，即将跳转...', 2);
     setTimeout(() => {
      this.repeatSubmit = false;
      callBack && callBack(res)
    }, 3000)
   }
  
}
