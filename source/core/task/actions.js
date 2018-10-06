// Types
import { types } from './types';

export const taskActions = {
    // Sync
    setEditMode: (editMode) => ({
        type:    types.SET_EDIT_MODE,
        payload: editMode,
    }),
    updateInputMessage: (newData) => ({
        type:    types.SET_INPUT_MESSAGE,
        payload: newData,
    }),
};
