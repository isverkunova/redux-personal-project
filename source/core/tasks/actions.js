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
    starTask: (starredTaskData) => {
        return {
            type:    types.STAR_TASK,
            payload: starredTaskData,
        };
    },
    unstarTask: (taskId) => {
        return {
            type:    types.UNSTAR_TASK,
            payload: taskId,
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
    starTaskAsync: (taskId) => {
        return {
            type:    types.STAR_TASK_ASYNC,
            payload: taskId,
        };
    },
    unstarTaskAsync: (taskId) => {
        return {
            type:    types.UNSTAR_TASK_ASYNC,
            payload: taskId,
        };
    },
};
