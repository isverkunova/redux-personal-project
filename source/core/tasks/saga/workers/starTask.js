// // Core
// import { put, apply } from 'redux-saga/effects';

// // Instruments
// import { api } from '../../../../REST';
// import { tasksActions } from '../../actions';
// import { uiActions } from '../../../ui/actions';

// export function* starTask ({ payload: taskId }) {
//     try {
//         yield put(uiActions.startFetching());

//         const response = yield apply(api, api.tasks.star, [taskId]);

//         console.log('status', response.status);

//         if (response.status !== 200) {
//             const { message } = yield apply(response, response.json);

//             throw new Error(message);
//         }

//         yield put(tasksActions.starTask({ taskId }));
//     } catch (error) {
//         yield put(uiActions.emitError(error, 'starTask worker'));
//     } finally {
//         yield put(uiActions.stopFetching());
//     }
// }
