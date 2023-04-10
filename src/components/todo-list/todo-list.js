import React, { Component } from 'react'

import TodoListItem from './../todo-list-item/todo-list-item'

import './todo-list.css'

export default class TodoList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onUpdateTime } = this.props
    return todos.map((item) => {
      const { id, ...itemProps } = item
      return (
        <li key={id} className="task">
          <TodoListItem
            id={id}
            {...itemProps}
            onDeleted={() => {
              onDeleted(item.id)
            }}
            onToggleDone={() => onToggleDone(id)}
            onUpdateTime={onUpdateTime}
          />
        </li>
      )
    })
  }
}
