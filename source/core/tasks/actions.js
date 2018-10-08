// Types
import { types } from './types';

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },
    removeTask: (id) => {
        return {
            type:    types.REMOVE_TASK,
            payload: id,
        };
    },
    editTask: (editedTask) => {
        return {
            type:    types.EDIT_TASK,
            payload: editedTask,
        };
    },
    completeAllTasks: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS,
            payload: tasks,
        };
    },

    // Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (message) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: message,
        };
    },
    removeTaskAsync: (id) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: id,
        };
    },
    editTaskAsync: (taskToEdit) => {
        return {
            type:    types.EDIT_TASK_ASYNC,
            payload: taskToEdit,
        };
    },
    completeAllTasksAsync: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: tasks,
        };
    },
};
