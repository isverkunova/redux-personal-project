// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import { Form as RForm, Control } from 'react-redux-form';

// Instruments
import Styles from './styles.m.css';
import { scheduler } from '../../core/forms/shapes';

// Components
import Task from '../Task';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from '../../core/tasks/actions';

const mapState = (state) => {
    return {
        tasks:       state.tasks,
        searchTasks: state.forms.search.message,
    };
};

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators({ ...tasksActions }, dispatch),
    };
};

@connect(
    mapState,
    mapDispatch
)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    formikForm = createRef();

    _submitForm = (formData, actions) => {
        this._createTask(formData);
        actions.resetForm();
    };

    _createTask = ({ message }) => {
        const { actions } = this.props;

        if (!message || message.trim() === "") {
            return null;
        }

        actions.createTaskAsync(message);
    };

    _submitFormOnEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            this.formikForm.current.submitForm();
        }
    };

    _setCompletion = () => {
        const { tasks } = this.props;

        const checkCompletion = tasks.every((task) => task.get('completed'));

        return checkCompletion;
    }

    _completeAllTasks = () => {
        if (!this._setCompletion()) {
            const { tasks, actions } = this.props;

            const taskToComplete = tasks.filter((task) => !task.get('completed'));

            const completedTasks = taskToComplete.map((task) => task.set('completed', true));

            actions.completeAllTasksAsync(completedTasks);
        } else {
            return null;
        }
    }

    _sorting = (tasks) => {
        const priorityTasks = tasks.filter((task) => task.get('favorite') && !task.get('completed'));
        const defaultTasks = tasks.filter((task) => !task.get('favorite') && !task.get('completed'));
        const completedPriorityTasks = tasks.filter((task) => task.get('favorite') && task.get('completed'));
        const completedTasks = tasks.filter((task) => !task.get('favorite') && task.get('completed'));

        return [...priorityTasks, ...defaultTasks, ...completedPriorityTasks, ...completedTasks];
    }

    render () {
        const { actions, tasks, searchTasks } = this.props;
        const setCompletion = this._setCompletion();

        const searchedTasks = tasks.filter((task) => task.get('message').toLowerCase().includes(searchTasks.toLowerCase()));

        const filteredList = searchTasks ? searchedTasks : tasks;

        const todoList = this._sorting(filteredList).map((task) => (
            <Catcher key = { task.get('id') }>
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    message = { task.get('message') }
                    task = { task }
                />
            </Catcher>
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>To Do</h1>
                        <RForm className = { Styles.input } model = 'forms.search'>
                            <Control.text
                                model = 'forms.search.message'
                                placeholder = 'Search'
                                type = 'search'
                            />
                        </RForm>
                    </header>
                    <section>
                        <Formik
                            initialValues = { scheduler.shape }
                            ref = { this.formikForm }
                            render = { () => {
                                return (
                                    <Form>
                                        <Field
                                            maxLength = '50'
                                            name = 'message'
                                            placeholder = 'Description of my new task'
                                            type = 'text'
                                            onKeyPress = { this._submitFormOnEnter }
                                        />
                                        <button type = 'submit'>Add new task</button>
                                    </Form>
                                );
                            } }
                            validationSchema = { scheduler.schema }
                            onSubmit = { this._submitForm }
                        />
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { setCompletion }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            All tasks completed
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
