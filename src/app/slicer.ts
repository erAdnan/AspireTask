import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationState } from "@react-navigation/native";

export interface State {
    route: NavigationState;
    appState: string;
    stub: boolean;
}

export const initialState: State = {
    route: { key: "", routes: [], routeNames: [], index: 0, type: "", stale: false },
    appState: "active",
    stub: false,
};

export const GlobalStateType = typeof initialState;

export const { actions, reducer, name } = createSlice({
    initialState,
    name: "app",
    reducers: {
        routeChanged(state, action: PayloadAction<{ route: NavigationState }>) {
            state.route = action.payload.route;
        },
        appStateChanged: (state, action) => {
            state.appState = action.payload;
        },
        stubChanged: (state, action: PayloadAction<boolean>) => {
            state.stub = action.payload;
        },
    },
});
