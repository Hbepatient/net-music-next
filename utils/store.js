import { createContext, useContext, useState } from 'react';
import { extendObservable, observable } from 'mobx';

// 所有组件共享的 store对象
let observableStore = null;
const storeContext = createContext(Object.create(null));

const createStore = (rootStoreData) => observable({
    rootStore: Object.assign({}, rootStoreData)
});

// store 初始化
export const initStore = (rootStoreData) => {
    observableStore = createStore(rootStoreData);
}

export const StoreProvider = ({ children }) => {
    const [store] = useState(() => observableStore);
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};


export const useStore = () => {
    const store = useContext(storeContext);
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};

export const addStore = (moduleName, moduleData) => {
    const store = useStore();
    if (!store[moduleName]) {
        const mod = Object.create(null);
        mod[moduleName] = moduleData;
        extendObservable(store, mod);
    }else{
        store[moduleName] = moduleData;
    }
    return store;
};