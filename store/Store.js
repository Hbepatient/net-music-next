import { enableStaticRendering } from 'mobx-react';
import { Base } from './Base';
import config from './config';

export const isServer = typeof window === 'undefined';
// 服务端store取消响应式，防止内存泄漏
enableStaticRendering(isServer);

class Store extends Base {
  constructor() {
    super();
    // 自动注册子Store
    for (let key in config) {
      this[key] = new config[key]();
    }
  };

};

let store;
export function initializeStore(initialState) {
  if (isServer) {
    return new Store();
  }
  store = new Store(initialState);
  return store;
}

export default Store;