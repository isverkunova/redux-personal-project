// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';

// Instruments
import Styles from './styles.m.css';
import { scheduler } from '../../core/form/shapes';
// import { tempTasks } from './tasks';

// Components
import Task from '../Task';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from '../../core/tasks/actions';
// import { taskActions } from '../../core/task/actions';

const mapState = (state) => {
    return {
        tasks: state.tasks,
        // isEditing:      state.task.get('isEditing'),
        // updatedMessage: state.task.get('updatedMessage'),
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

    render () {
        const {
            actions,
            tasks,
            // isEditing,
            // updatedMessage
        } = this.props;

        const todoList = tasks.map((task) => (
            <Catcher key = { task.get('id') }>
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    // isEditing = { isEditing }
                    message = { task.get('message') }
                    task = { task }
                    // updatedMessage = { updatedMessage }
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
                                    <input placeholder = 'Поиск' type = 'search' />
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
                                    <Checkbox checked color1 = '#363636' color2 = '#fff' />
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
