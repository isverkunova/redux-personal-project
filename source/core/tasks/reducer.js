// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);

        case types.EDIT_TASK:
            return state.map((task) => task.get('id') === action.payload.id ? fromJS(action.payload) : task);

        default:
            return state;
    }
};
