import type { State as ReduxState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

export const rootDashboardSelector = (state: ReduxState) => state?.dashboard;

export const getDataSelector = createSelector(rootDashboardSelector, (state): any => {
    return state.data?.data ?? {};
});
