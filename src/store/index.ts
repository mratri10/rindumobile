import React from "react";
import counterStore from "./CounterStore";
import textInputStore from "./TextInputStore";
import appStore from "./AppStore";
import addressStore from "./AddressStore"
import authStore from "./AuthStore"


export const stores = Object.freeze({
    counterStore,
    textInputStore,
    appStore,
    addressStore,
    authStore
});

export const storeContext = React.createContext(stores);
export const StoresProvider = storeContext.Provider;

export const useStores = () => React.useContext(storeContext);
export const useStore = <T extends keyof typeof stores>(
    store: T
): typeof stores[T] => React.useContext(storeContext)[store]