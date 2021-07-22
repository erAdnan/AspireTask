import * as React from "react";
import { NavigationContainerRef, CommonActions } from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef>() as React.MutableRefObject<
    NavigationContainerRef
>;
export const isReadyRef = React.createRef() as React.MutableRefObject<unknown>;

/**
Universal navigation solution copied from the documentation.
@see https://reactnavigation.org/docs/navigating-without-navigation-prop
*/

export function navigate(name: string, params?: Record<string, unknown> | undefined) {
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
        console.info("NAVIGATION: app hasn't mounted");
    }
}

export function goBack() {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.goBack();
    }
}

export function getIndex() {
    return navigationRef.current?.getRootState()?.routes[0]?.state?.index;
}

export function getCurrentRoute() {
    return navigationRef.current?.getCurrentRoute();
}

export function getCurrentSection() {
    const index = navigationRef.current?.getRootState()?.routes[0]?.state?.index ?? undefined;
    const routeNames = navigationRef.current?.getRootState()?.routes[0]?.state?.routeNames ?? undefined;

    if (index === undefined || routeNames === undefined) {
        return "";
    }

    return routeNames[index];
}

export const addScreenToHistory = (index: number, screenName: string) => {
    if (isReadyRef.current && navigationRef.current) {
        const key = navigationRef.current.getRootState().routes[0].state?.routes[index].key;
        navigationRef.current.dispatch({
            ...CommonActions.setParams({ screen: screenName }),
            source: key,
        });
    }
};

export const setScreenHome = (index: number) => {
    if (isReadyRef.current && navigationRef.current) {
        const key = navigationRef.current.getRootState().routes[0].state?.routes[index].key;
        if (key) {
            navigationRef.current.dispatch(
                CommonActions.navigate({
                    key: key,
                }),
            );
        }
    }
};
