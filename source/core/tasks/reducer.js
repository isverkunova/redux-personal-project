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
            return state.update(
                state.findIndex(
                    (task) => task.get('id') === action.payload[0].id
                ),
                (task) => task.merge(action.payload[0])
            );

        case types.COMPLETE_ALL_TASKS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
