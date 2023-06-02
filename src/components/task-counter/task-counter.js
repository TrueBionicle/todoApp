import React from 'react'
import './task-counter.css'
const TaskCounter = ({ taskCounter }) => {
  return (
    <div className="task-counter">
      <span className="task-counter-item">{taskCounter}</span>
    </div>
  )
}

export default TaskCounter
