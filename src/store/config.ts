import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import AsyncStorage from "@react-native-community/async-storage";
import { PersistConfig } from "redux-persist";
import type { State } from "./reducers";

const persistConfig: PersistConfig<State> = {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: hardSet,
};

export default persistConfig;
