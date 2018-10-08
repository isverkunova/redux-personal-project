// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* completeAllTasks ({ payload: allTasks }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.complete, [allTasks]);
        const { data, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.completeAllTasks(data));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeAllTasks worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
