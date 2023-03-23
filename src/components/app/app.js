import React from 'react'

import ItemAddForm from '../item-add-form/item-add-form'
import StatusFilter from '../item-status-filter/item-status-filter'
import TaskCounter from '../task-counter/task-counter'

import TodoList from './../todo-list/todo-list'
import AppHeader from './../app-header/app-header'
import './app.css'

export default class App extends React.Component {
  maxId = 100
  state = {
    todoData: [
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Make awsome App'),
      this.createTodoItem('Have a lunch'),
      this.createTodoItem('Have a lunch'),
    ],
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      date: new Date(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onItemAdded = (text) => {
    if (text) {
      this.setState(({ todoData }) => {
        const newItem = this.createTodoItem(text)
        const newArray = [...todoData, newItem]
        return {
          todoData: newArray,
        }
      })
    }
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  removeAllDone = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.done)
      return {
        todoData: newArray,
      }
    })
    return this.state.todoData.filter((item) => !item.done)
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    if (filter !== 'clear') {
      this.setState({ filter })
    } else {
      this.removeAllDone()
    }
  }

  taskCounter = () => {
    let counter = this.state.todoData.filter((items) => !items.done).length
    switch (counter) {
      case 0:
        return 'Good job. All done!'
      case 1:
        return '1 task left'
      default:
        return `${counter} tasks left`
    }
  }

  render() {
    const { todoData, filter } = this.state
    const visibleItems = this.filter(todoData, filter)
    return (
      <div className="todo-app">
        <AppHeader />
        <ItemAddForm onAddItem={this.onItemAdded} />
        <div className="main">
          <TodoList
            todos={visibleItems}
            onDeleted={(id) => {
              this.deleteItem(id)
            }}
            onToggleDone={this.onToggleDone}
          />
          <div className="footer">
            <TaskCounter taskCounter={this.taskCounter()} />
            <StatusFilter
              visibleItems={visibleItems}
              filter={filter}
              onFilterChange={this.onFilterChange}
              onRemoveAllDone={this.removeAllDone}
            />
          </div>
        </div>
      </div>
    )
  }
}
