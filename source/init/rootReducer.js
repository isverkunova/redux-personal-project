// Core
import { combineReducers } from 'redux';
// import { routerReducer as router } from 'react-router-redux';

// Reducers
// import { authReducer as auth } from '../bus/auth/reducer';
// import { uiReducer as ui } from '../bus/ui/reducer';
import { tasksReducer as tasks } from '../core/tasks/reducer';
// import { profileReducer as profile } from '../bus/profile/reducer';
// import { usersReducer as users } from '../bus/users/reducer';
// import { formsReducer as forms } from '../bus/forms/reducer';

export const rootReducer = combineReducers({
    // auth,
    // ui,
    tasks,
    // profile,
    // users,
    // router,
    // forms,
});
