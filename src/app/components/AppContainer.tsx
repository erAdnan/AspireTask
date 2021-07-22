import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ErrorBoundary from "@src/common/components/ErrorBoundary";
import { RootNavigator } from "@src/navigation";
import { getStoreInstance } from "@src/store";
import { navigationRef, isReadyRef } from "@src/services/navigation";
import { actions } from "../slicer";
import { useRouteTracker } from "@src/navigation/hooks";
import { getRoute } from "../selectors";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import type { NavigationState } from "@react-navigation/routers";

const notReady = () => {
    isReadyRef.current = false;
};

export interface AppContainerProps {
  reduxRoute: (state: NavigationState | undefined, onStateChange: () => void) => void;
}

export const AppContainer: React.FC<AppContainerProps> = ({
    reduxRoute,
}) => {
    const storeInstance = getStoreInstance();
    const initialState = getRoute(storeInstance.store.getState());

    const onRouteChange = (newRoute?: string, oldRoute?: string) => {
        console.info("navigation", { from: oldRoute, to: newRoute });
    }
    const [onReady, onStateChange] = useRouteTracker(navigationRef, isReadyRef, onRouteChange);
    
    const getReduxRoute = React.useCallback(
        (state) => {
            return reduxRoute(state, onStateChange);
        },
        [onStateChange, reduxRoute],
    );

    React.useEffect(() => {
        return notReady;
    }, []);

    return (
        <NavigationContainer
            initialState={initialState}
            ref={navigationRef}
            onReady={onReady}
            onStateChange={getReduxRoute}
            >
            <ErrorBoundary>
                <RootNavigator />
            </ErrorBoundary>
        </NavigationContainer>
    );
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        reduxRoute: (state: NavigationState | undefined, onStateChange: () => void) => {
            if (state) {
                dispatch(actions.routeChanged({ route: state }));
            }
            onStateChange();
        },
    };
};

export default connect(null, mapDispatchToProps)(AppContainer);
