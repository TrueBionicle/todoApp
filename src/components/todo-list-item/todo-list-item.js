import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import './todo-list-item.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Timer from '../timer/timer'
export default class TodoListItem extends React.Component {
  static defaultProps = {
    label: 'Task',
    date: new Date(),
    done: false,
  }

  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.object,
  }

  render() {
    const { label, date, onDeleted, onToggleDone, done, id, timerMinutes, timerSeconds } = this.props
    console.log(label, timerMinutes, timerSeconds)
    return (
      <div className="task-container">
        <input checked={done} type="checkbox" id={id} className="checkBoxBtn" onChange={onToggleDone}></input>

        <label htmlFor={id} className={'todo-list-item-container'}>
          <div className={cn('todo-list-item', { done: done })}>
            <p className="todo-list-item-label">{label}</p>
          </div>
        </label>
        <Timer timerMinutes={timerMinutes} timerSeconds={timerSeconds} />
        <span className="created-time">Created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>

        <button type="button" className="delete" onClick={onDeleted}></button>
      </div>
    )
  }
}
