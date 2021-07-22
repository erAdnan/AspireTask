import { createSelector } from "@reduxjs/toolkit";
import { State } from "../store";

export const rootGlobalSelector = (state: State) => state.app;

export const getRoute = createSelector(rootGlobalSelector, (app) => {
    return app?.route?.routes?.length ? app?.route : { routes: [] };
});
