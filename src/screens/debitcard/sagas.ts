import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { actions as homeActions } from "./slicer";

export function* fetchData() {
    try {
        console.log("fetchData started...");
        const response = yield call(axios.get, ['/api/data']);
        console.log("fetchData response", response)
        if(response.data) {
            yield put(homeActions.updateFetchedData({ data: response.data }));
        }
    } catch (error) {
        console.log("fetchData: error: ", error);
        yield put(homeActions.updateFetchedDataFailed());
    }
}

export const sagas = () => [
    takeLatest(homeActions.startFetchingData.type, fetchData),
];
