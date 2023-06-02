import React, { useState } from 'react'
import nextId from 'react-id-generator'

import ItemAddForm from '../item-add-form/item-add-form'
import StatusFilter from '../item-status-filter/item-status-filter'
import TaskCounter from '../task-counter/task-counter'

import TodoList from './../todo-list/todo-list'
import AppHeader from './../app-header/app-header'
import './app.css'

const App = () => {
  const createTodoItem = (label, time) => {
    return {
      label,
      important: false,
      done: false,
      id: nextId(),
      date: new Date(),
      time: time,
    }
  }
  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Coffe', 20),
    createTodoItem('Make awsome App'),
    createTodoItem('Have a lunch', 350),
    createTodoItem('Have a lunch'),
  ])

  const [filterState, changeFilterState] = useState('all')

  const onItemAdded = (text, time = 0) => {
    if (text) {
      const newItem = createTodoItem(text, time)
      const newArray = [...todoData, newItem]
      setTodoData(newArray)
    }
  }

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, done: !oldItem.done }
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const removeAllDone = () => {
    const newArray = todoData.filter((item) => !item.done)
    setTodoData(newArray)
    return todoData.filter((item) => !item.done)
  }

  const updateTime = (id, time) => {
    console.log('update')
    const idx = todoData.findIndex((el) => el.id === id)
    console.log(todoData[idx])
    if (idx >= 0) {
      todoData[idx].time = time
    }
  }

  const SetFilter = (items, filterState) => {
    switch (filterState) {
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

  const taskCounter = () => {
    let counter = todoData.filter((items) => !items.done).length
    switch (counter) {
      case 0:
        return 'Good job. All done!'
      case 1:
        return '1 task left'
      default:
        return `${counter} tasks left`
    }
  }

  const onFilterChange = (filterState) => {
    if (filterState !== 'clear') {
      changeFilterState(filterState)
    } else {
      removeAllDone()
    }
  }

  const visibleItems = SetFilter(todoData, filterState)

  return (
    <div className="todo-app">
      <AppHeader />
      <div className="form-container">
        <ItemAddForm onAddItem={onItemAdded} />
      </div>
      <div className="main">
        <TodoList
          todos={visibleItems}
          onDeleted={(id) => {
            deleteItem(id)
          }}
          onToggleDone={onToggleDone}
          onUpdateTime={updateTime}
        />
        <div className="footer">
          <TaskCounter taskCounter={taskCounter()} />
          <StatusFilter
            visibleItems={visibleItems}
            filter={filterState}
            onFilterChange={onFilterChange}
            onRemoveAllDone={removeAllDone}
          />
        </div>
      </div>
    </div>
  )
}
export default App

// export default class App extends React.Component {
//   maxId = 100
//   state = {
//     todoData: [
//       this.createTodoItem('Drink Coffe'),
//       this.createTodoItem('Make awsome App'),
//       this.createTodoItem('Have a lunch'),
//       this.createTodoItem('Have a lunch'),
//     ],
//     filter: 'all',
//   }

//   createTodoItem(label, minutes = 0, seconds = 59) {
//     return {
//       label,
//       important: false,
//       done: false,
//       id: this.maxId++,
//       date: new Date(),
//       timerMinutes: minutes.toString().padStart(2, '0') || '',
//       timerSeconds: seconds.toString().padStart(2, '0') || '',
//     }
//   }

//   deleteItem = (id) => {
//     this.setState(({ todoData }) => {
//       const idx = todoData.findIndex((el) => el.id === id)

//       const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
//       return {
//         todoData: newArray,
//       }
//     })
//   }

//   onItemAdded = (text, minutes, seconds) => {
//     if (text) {
//       this.setState(({ todoData }) => {
//         const newItem = this.createTodoItem(text, minutes, seconds)
//         const newArray = [...todoData, newItem]
//         return {
//           todoData: newArray,
//         }
//       })
//     }
//   }

//   onToggleDone = (id) => {
//     this.setState(({ todoData }) => {
//       const idx = todoData.findIndex((el) => el.id === id)

//       const oldItem = todoData[idx]
//       const newItem = { ...oldItem, done: !oldItem.done }
//       const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
//       return {
//         todoData: newArray,
//       }
//     })
//   }

//   removeAllDone = () => {
//     this.setState(({ todoData }) => {
//       const newArray = todoData.filter((item) => !item.done)
//       return {
//         todoData: newArray,
//       }
//     })
//     return this.state.todoData.filter((item) => !item.done)
//   }

//   updateTime = (id, minutes, seconds) => {
//     this.setState(({ todoData }) => {
//       const idx = todoData.findIndex((el) => el.id === id)
//       if (idx >= 0) {
//         todoData[idx].timerMinutes = minutes
//         todoData[idx].timerSeconds = seconds
//       }
//     })
//   }

//   filter(items, filter) {
//     switch (filter) {
//       case 'all':
//         return items
//       case 'active':
//         return items.filter((item) => !item.done)
//       case 'done':
//         return items.filter((item) => item.done)
//       default:
//         return items
//     }
//   }

//   onFilterChange = (filter) => {
//     if (filter !== 'clear') {
//       this.setState({ filter })
//     } else {
//       this.removeAllDone()
//     }
//   }

//   taskCounter = () => {
//     let counter = this.state.todoData.filter((items) => !items.done).length
//     switch (counter) {
//       case 0:
//         return 'Good job. All done!'
//       case 1:
//         return '1 task left'
//       default:
//         return `${counter} tasks left`
//     }
//   }

//   render() {
//     const { todoData, filter } = this.state
//     const visibleItems = this.filter(todoData, filter)
//     return (
//       <div className="todo-app">
//         <AppHeader />
//         <div className="form-container">
//           <ItemAddForm onAddItem={this.onItemAdded} />
//         </div>
//         <div className="main">
//           <TodoList
//             todos={visibleItems}
//             onDeleted={(id) => {
//               this.deleteItem(id)
//             }}
//             onToggleDone={this.onToggleDone}
//             onUpdateTime={this.updateTime}
//           />
//           <div className="footer">
//             <TaskCounter taskCounter={this.taskCounter()} />
//             <StatusFilter
//               visibleItems={visibleItems}
//               filter={filter}
//               onFilterChange={this.onFilterChange}
//               onRemoveAllDone={this.removeAllDone}
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
