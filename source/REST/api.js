// Instruments
import { MAIN_URL, TOKEN } from './config';

export const api = {
    tasks: {
        fetch () {
            return fetch(`${MAIN_URL}`, {
                method:  'GET',
                headers: {
                    Authorization: TOKEN,
                },
            });
        },
    },
};
