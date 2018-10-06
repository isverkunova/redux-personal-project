// Core
import { Map, fromJS } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    isEditing:      false,
    updatedMessage: Map({
        id:      '',
        message: '',
    }),
});

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_EDIT_MODE:
            return state.set('isEditing', action.payload);

        case types.SET_INPUT_MESSAGE:
            return state.set('updatedMessage', fromJS(action.payload));

        default:
            return state;
    }
};
