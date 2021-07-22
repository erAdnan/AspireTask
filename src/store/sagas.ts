import { all, take, cancel, fork, delay, put, race } from "redux-saga/effects";
import { sagas as dashboardSagas } from "@src/screens/debitcard/sagas";

function* sagas() {
    yield all([
        timer("minute", 60),
        ...dashboardSagas()
    ]);
}

function* timer(name: string, seconds: number) {
    try {
        do {
            const { stop } = yield race({ delay: delay(seconds * 1000), stop: take(`timer/${name}/cancel`) });
            if (stop) return;
            yield put({ type: `timer/${name}/tick` });
        } while (true);
    } finally {
        yield put({ type: `timer/${name}/stop` });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createCancelableSaga(saga: any) {
    if (process.env.NODE_ENV !== "development") {
        return saga;
    } else {
        return function* () {
            const sagaTask = yield fork(saga);

            yield take(CANCEL_SAGAS_HMR);
            yield cancel(sagaTask);
        };
    }
}

const CANCEL_SAGAS_HMR = "CANCEL_SAGAS_HMR";

const sagaManager = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    startSagas(sagaMiddleware: { run: (arg0: any) => void }) {
        const saga = createCancelableSaga(sagas);
        sagaMiddleware.run(saga);
    },

    cancelSagas(store: { dispatch: (arg0: { type: string }) => void }) {
        store.dispatch({
            type: CANCEL_SAGAS_HMR,
        });
    },
};

export default sagaManager;
