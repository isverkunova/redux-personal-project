// Core
import { combineReducers } from 'redux';

// Reducers
import { uiReducer as ui } from '../core/ui/reducer';
import { tasksReducer as tasks } from '../core/tasks/reducer';

export const rootReducer = combineReducers({
    ui,
    tasks,
});
