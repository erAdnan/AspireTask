import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface State {
    isLoading: boolean;
    hasError: boolean;
    data: any;
    showLimitProgress: boolean;
    weeklySaveLimit: string;
}

export const initialState: State = {
    hasError: false,
    isLoading: false,
    data: {},
    showLimitProgress: false,
    weeklySaveLimit: "0.00",
};

export const { actions, reducer, name } = createSlice({
    initialState,
    name: "dashboard",
    reducers: {
        startFetchingData: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        updateFetchedData: (state, action: PayloadAction<{ data: any }>) => {
            state.isLoading = false;
            state.hasError = false;
            state.data = action.payload.data;
        },
        updateFetchedDataFailed: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        toggleLimitProgress: (state) => {
            state.showLimitProgress = !state.showLimitProgress;
        },
        updateWeeklySaveLimit: (state, action: PayloadAction<{ value: string }>) => {
            state.weeklySaveLimit = action.payload.value;
        },
    },
});
