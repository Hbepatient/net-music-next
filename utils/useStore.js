import { useContext, createContext } from 'react';

const storeContext = createContext(Object.create(null));

export const StoreProvider = ({ children, store }) => {
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
    const store = useContext(storeContext);
    // if (!store) {
    //     // this is especially useful in TypeScript so you don't need to be checking for null all the time
    //     throw new Error('useStore must be used within a StoreProvider.');
    // }
    return store;
};