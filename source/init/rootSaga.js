// Core
import { all, call } from 'redux-saga/effects';

// Watchers
import { watchTasks } from '../core/tasks/saga/watchers';
// import { watchAuth } from '../bus/auth/saga/watchers';
// import { watchUsers } from '../bus/users/saga/watchers';
// import { watchProfile } from '../bus/profile/saga/watchers';

export function* rootSaga () {
    yield all([call(watchTasks)]);
}

// function* watchTasks () {
//     yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasksWorker);
//     yield takeEvery(types.CREATE_TASK_ASYNC, createTaskWorker);
// }
