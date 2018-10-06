// Core
import React, { Component, createRef } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends Component {
    state = {
        isEditing: false,
        message:   this.props.message,
    }

    taskInput = createRef();

    _removeTask = () => {
        const { actions, id } = this.props;

        actions.removeTaskAsync(id);
    };

    _updateInputMessage = (event) => {
        this.setState({
            message: event.target.value,
        });
    };

    _setEditMode = () => {
        const { isEditing } = this.state;

        console.log('this.state', this.state);
        if (isEditing) {
            //this._cancelEditing();

            this.setState({ isEditing: false });
            console.log('if isEditing was TRUE, it should become FALSE', this.state);
        } else {
            //this._startEditing();

            this.setState({ isEditing: true });
            console.log('if isEditing was FALSE, it should become TRUE', this.state);
        }
    };

    _startEditing = () => {
        const { message } = this.props;

        this.setState({
            isEditing: true,
            message,
        },
        () => this.taskInput.current.focus());
    };

    _editing = (event) => {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 13:
                this._saveEditing();
                break;
            case 27:
                this._cancelEditing();
                break;
            default:
                break;
        }
    };

    _saveEditing = () => {
        const { actions, id, completed, favorite } = this.props;
        const { message } = this.state;

        actions.editTaskAsync({ id, message, completed, favorite });
        this.setState({
            isEditing: false,
        });
    };

    _cancelEditing = () => {
        const { message } = this.props;

        this.setState(() => ({
            isEditing: false,
            message,
        }));
    };

    render () {
        const { message, completed, isEditing, favorite } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                    />
                    <input
                        disabled = { !isEditing }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { message }
                        onChange = { this._updateInputMessage }
                        onKeyDown = { this._editing }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._starTask }
                    />
                    <Edit
                        inlineBlock
                        checked = { isEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._setEditMode }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
