// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchTasks, createTask, removeTask, editTask, completeAllTasks } from './workers';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchEditTask () {
    yield takeEvery(types.EDIT_TASK_ASYNC, editTask);
}

function* watchTasksCompletion () {
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasks);
}

export function* watchTasks () {
    yield all([
        call(watchFetchTasks),
        call(watchCreateTask),
        call(watchRemoveTask),
        call(watchEditTask),
        call(watchTasksCompletion)
    ]);
}
