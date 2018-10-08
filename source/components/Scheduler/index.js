// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';

// Instruments
import Styles from './styles.m.css';
import { scheduler } from '../../core/form/shapes';

// Components
import Task from '../Task';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from '../../core/tasks/actions';

const mapState = (state) => {
    return {
        tasks: state.tasks,
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
        if (!message) {
            return null;
        }

        this.props.actions.createTaskAsync(message);
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

    _search = (event) => {
        const { value } = event.target;
        const { tasks } = this.props;

        console.log('value', value);
        console.log('tasks', tasks);

        const searchedTasks = tasks.filter((task) => task.get('message').includes(value));

        console.log('searchedTasks', searchedTasks);
    }

    render () {
        const { actions, tasks } = this.props;
        const setCompletion = this._setCompletion();

        const todoList = this._sorting(tasks).map((task) => (
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
            <Formik
                initialValues = { scheduler.shape }
                ref = { this.formikForm }
                render = { () => {
                    return (
                        <section className = { Styles.scheduler }>
                            <main>
                                <header>
                                    <h1>Планировщик задач</h1>
                                    <form>
                                        <input
                                            placeholder = 'Поиск'
                                            type = 'search'
                                            onChange = { this._search }
                                        />
                                    </form>
                                    {/* <Form>
                                        <Field
                                            maxLength = '50'
                                            name = 'searchInput'
                                            placeholder = 'Поиск'
                                            type = 'search'
                                            value = { searchText }
                                            onChange = { this._search }
                                        />
                                    </Form> */}
                                </header>
                                <section>
                                    <Form>
                                        <Field
                                            maxLength = '50'
                                            name = 'message'
                                            placeholder = 'Описание моей новой задачи'
                                            type = 'text'
                                            onKeyPress = { this._submitFormOnEnter }
                                        />
                                        <input type = 'submit' value = 'Добавить задачу' />
                                    </Form>
                                </section>
                                <div className = { Styles.overlay }>
                                    <ul>{todoList}</ul>
                                </div>
                                <footer>
                                    <Checkbox
                                        checked = { setCompletion }
                                        color1 = '#363636'
                                        color2 = '#fff'
                                        onClick = { this._completeAllTasks }
                                    />
                                    <span className = { Styles.completeAllTasks }>
                                        Все задачи выполнены
                                    </span>
                                </footer>
                            </main>
                        </section>
                    );
                } }
                validationSchema = { scheduler.schema }
                onSubmit = { this._submitForm }
            />
        );
    }
}
