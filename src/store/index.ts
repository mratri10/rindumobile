import React from "react";
import counterStore from "./CounterStore";
import textInputStore from "./TextInputStore";


export const stores = Object.freeze({
    counterStore,
    textInputStore
});

export const storeContext = React.createContext(stores);
export const StoresProvider = storeContext.Provider;

export const useStores = () => React.useContext(storeContext);
export const useStore = <T extends keyof typeof stores>(
    store: T
): typeof stores[T] => React.useContext(storeContext)[store]