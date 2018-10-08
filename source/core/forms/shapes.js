// Core
import { object, string } from 'yup';

export const scheduler = {
    shape: {
        message: '',
    },
    schema: object().shape({
        message: string()
            .required()
            .max(50),
    }),
};
