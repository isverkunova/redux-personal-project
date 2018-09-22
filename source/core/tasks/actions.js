// Types
import { types } from './types';

export const postsActions = {
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
    starTask: (starredTask) => {
        return {
            type:    types.STAR_TASK,
            payload: starredTask,
        };
    },
    unstarTask: (taskId) => {
        return {
            type:    types.UNSTAR_TASK,
            payload: taskId,
        };
    },
    editTask: (editedTask) => {
        return {
            type:    types.EDIT_TASK,
            payload: editedTask,
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
    editTaskAsync: (editedTaskData) => {
        return {
            type:    types.EDIT_TASK_ASYNC,
            payload: editedTaskData,
        };
    },
};
