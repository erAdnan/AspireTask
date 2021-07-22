import React from "react";
import { StatusBar, AppState, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { getStoreInstance } from "@src/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { actions } from "../slicer";
import AppContainer from "./AppContainer";
import { SafeAreaWrapper } from "@src/common/components/SafeAreaSpacer";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: React.FC = () => {
    const storeInstance = getStoreInstance();
    const _handleAppStateChange = React.useCallback(
        (nextAppState) => {
            storeInstance.store.dispatch(actions.appStateChanged(nextAppState));
        },
        [storeInstance.store],
    );

    React.useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, [_handleAppStateChange]);

    return (
        <SafeAreaProvider>
            <Provider store={storeInstance.store}>
                <PersistGate loading={<ActivityIndicator />} persistor={storeInstance.persist}>
                    <StatusBar barStyle="dark-content" />
                    <SafeAreaWrapper>
                        <AppContainer />
                    </SafeAreaWrapper>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
