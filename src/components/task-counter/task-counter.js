import React from 'react'
import './task-counter.css'
export default class TaskCounter extends React.Component {
  render() {
    const { taskCounter } = this.props
    return (
      <div className="task-counter">
        <span className="task-counter-item">{taskCounter}</span>
      </div>
    )
  }
}
