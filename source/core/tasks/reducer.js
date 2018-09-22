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

        // case types.STAR_TASK:
        //     return state.set('isAuthenticated', true);

        // case types.UNSTAR_TASK:
        //     return state.updateIn(
        //         [
        //             state.findIndex((post) => {
        //                 return post.get('id') === action.payload.postId;
        //             }),
        //             'likes'
        //         ], (likes) => {
        //             return likes.filter((likers) => {
        //                 return likers.get('id') !== action.payload.liker;
        //             });
        //         }
        //     );

        default:
            return state;
    }
};
