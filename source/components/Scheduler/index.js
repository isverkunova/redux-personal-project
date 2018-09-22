// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
import { tasks } from './tasks';

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

    render () {
        const { actions } = this.props;

        const todoList = tasks.map((task) => (
            <Catcher key = { task.get('id') }>
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    message = { task.get('message') }
                    { ...task }
                />
            </Catcher>
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
