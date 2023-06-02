import React from 'react'

import TodoListItem from './../todo-list-item/todo-list-item'

import './todo-list.css'

const TodoList = ({ todos, onDeleted, onToggleDone, onUpdateTime }) => {
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
          getTime={item.time}
          onToggleDone={() => onToggleDone(id)}
          onUpdateTime={onUpdateTime}
        />
      </li>
    )
  })
}

export default TodoList
