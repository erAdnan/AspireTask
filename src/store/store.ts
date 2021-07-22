import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagaManger from "@src/store/sagas";
import persist from "./persist";
import { State } from "./reducers";
import Reactotron from "../../reactotron.config";

let store: ReturnType<typeof createStore>;
export const getStoreInstance = (initialState?: State) => store ?? (store = createStore(initialState));
export const createStore = (initialState?: State) => {
    if (process.env.NODE_ENV !== "test" && typeof store !== "undefined") {
        console.error("Destroying the already created Redux store. This should not happen outside of unit tests");
    }

    let sagaMiddleware;

    const middleware = [];
    const enhancers: any = [];

    if (__DEV__) {
        enhancers.push(Reactotron?.createEnhancer());
        const reactotronSagaMonitor = Reactotron?.createSagaMonitor();
        sagaMiddleware = createSagaMiddleware({
            sagaMonitor: reactotronSagaMonitor,
        });
        middleware.push(sagaMiddleware);
    } else {
        sagaMiddleware = createSagaMiddleware();

        middleware.push(sagaMiddleware);
    }

    const reducer = persist.reducer(require("./config").default, require("./reducers").default);

    const newStore = configureStore({
        devTools: process.env.NODE_ENV === "development",
        middleware: [
            ...getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }),
            ...middleware,
        ],
        preloadedState: initialState,
        reducer,
        enhancers,
    });

    sagaManger.startSagas(sagaMiddleware);

    console.info("store created");
    return { store: newStore, persist: persist.store(newStore) };
};

if (__DEV__ && module.hot && sagaManger) {
    module.hot.dispose((data) => {
        console.info("hot reload", data);
        sagaManger.cancelSagas(store.store);
    });

    module.hot.accept("./reducers", () => {
        const newRootReducer = require("./reducers").default;
        store.store.replaceReducer(newRootReducer);
    });
}
