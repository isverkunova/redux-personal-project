// Core
import { combineForms } from 'react-redux-form';

export const formsReducer = combineForms(
    {
        search: {
            message: '',
        },
    },
    'forms'
);
