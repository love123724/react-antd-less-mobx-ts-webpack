/*
 * @Author: Robin
 * @Date: 2021-09-07 11:14:30
 */
import { Message, Modal } from 'antd';

export const isDev = true; // true为开发，false为生产

// 匹配接口前缀
export function autoMatch(prefix) {
  let baseUrl = '';
  if (isDev) {
    // 开发环境 通过proxy配置转发请求；
    baseUrl = `/${prefix || 'mock'}`;
  }
  return baseUrl;
}

export function checkStatus(response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = '';
    switch (status) {
      case -1:
        errorInfo = '远程服务响应失败,请稍后重试';
        break;
      case 400:
        errorInfo = '400：错误请求';
        break;
      case 401:
        errorInfo = '401：访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403：拒绝访问';
        break;
      case 404:
        errorInfo = '404：资源不存在';
        break;
      case 405:
        errorInfo = '405：请求方法未允许';
        break;
      case 408:
        errorInfo = '408：请求超时';
        break;
      case 500:
        errorInfo = '500：访问服务失败';
        break;
      case 501:
        errorInfo = '501：未实现';
        break;
      case 502:
        errorInfo = '502：无效网关';
        break;
      case 503:
        errorInfo = '503：服务不可用';
        break;
      default:
        errorInfo = `连接错误`;
    }
    return {
      status,
      msg: errorInfo,
    };
  }
}

/**
 * 根据参数名获取参数值
 */
export function getUrlParamByName(name) {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.href.match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return "";
}

export function splitUrl(url) {
  const str = url.split('?')[1];
  const items = (str && str.split('&')) || [];
  let arr = {};
  const json = {};
  for (let i = 0; i < items.length; i += 1) {
    arr = items[i].split('=');
    json[arr[0]] = arr[1];
  }
  return json;
}

//操作成功提示
export const modalSuccess = (msg) => {
  msg = msg || '操作成功！';
  Message.success(msg);
}

//操作错误提示
export const modalError = (msg) => {
  let modal = Modal.error({ title: msg || '操作错误！', okText: "", centered: false });
  setTimeout(() => {
    modal.destroy();
  }, 3000);
}

//提示成功并确认(统一管理平台使用，未考虑所有项目)
export const reminderComfirmSuccess = (title, content1, content2) => {
  title = title || '操作成功！';
  content1 = content1 || '......';
  content2 = content2 || '......';
  Modal.success({
    title: title,
    content: (<div><p>{content1}</p>
      <p>{content2}</p>
    </div>)
  });
}

/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
export const flattenRoutes = (arr) =>
  arr.reduce(
    (prev, item) => {
      if (Array.isArray(item.routes)) {
        prev.push(item)
      }
      return prev.concat(
        Array.isArray(item.routes) ? flattenRoutes(item.routes) : item
      )
    },
    []
  )

/**
 * 根据路径获取路由的name和key
 * @param {string} path 路由
 */
export const getKeyName = (path= '/403') => {
  const truePath = path.split('?')[0]
  const curRoute = flattenRoutes(routes).filter(
    (item) => item.path.includes(truePath)
  )
  if (!curRoute[0])
    return { title: '暂无权限', tabKey: '403', component: ErrorPage }
  const { name, key, component } = curRoute[0]
  return { title: name, tabKey: key, component }
}
/**
 * 获取本地存储中的权限
 */
export const getPermission = () =>
  store.getState().user.UserInfo.permission || []

/**
 * 根据权限判断是否有权限
 */
export const isAuthorized = (val) => {
  const permissions = getPermission()
  return !!permissions.find((_) => _.code === val)
}