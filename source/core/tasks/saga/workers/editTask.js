// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* editTask ({ payload: taskToEdit }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.edit, [taskToEdit]);
        const { data: [updatedTaskFromResponse], message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.editTask([updatedTaskFromResponse]));
    } catch (error) {
        yield put(uiActions.emitError(error, 'editTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
