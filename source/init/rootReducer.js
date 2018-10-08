// Core
import { combineReducers } from 'redux';

// Reducers
import { uiReducer as ui } from '../core/ui/reducer';
import { tasksReducer as tasks } from '../core/tasks/reducer';
import { formsReducer as forms } from '../core/forms/reducer';

export const rootReducer = combineReducers({
    ui,
    tasks,
    forms,
});
