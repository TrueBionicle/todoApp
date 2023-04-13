import React from 'react'
import './timer.css'

export default class Timer extends React.Component {
  state = {
    minutes: this.props.timerMinutes,
    seconds: this.props.timerSeconds,
    timer: false,
    timerStarted: false,
  }

  startTimer = (id) => {
    const updateTime = this.props.onUpdateTime
    if (this.state.timer === true) {
      return null
    }

    this.setState({ timerStarted: true, timer: true })

    const timeChange = setInterval(() => {
      this.checkOnDone()
      if (this.state.timerStarted) {
        this.setState(({ minutes, seconds }) => {
          let currentTime = this.setCurrentTime(minutes, seconds)
          return currentTime
        })
      }
      if (!this.state.timerStarted || (this.state.minutes == 0 && this.state.seconds == 0)) {
        clearInterval(timeChange)
        updateTime(id, this.state.minutes, this.state.seconds)
      }
    }, 1000)
  }

  checkOnDone = () => {
    if (this.props.doneStatus) {
      this.stopTimer()
    }
  }

  setCurrentTime = (minutes, seconds) => {
    return {
      minutes: function () {
        if (seconds != 0) {
          return this.setTimeFormat(minutes)
        } else {
          return this.setTimeFormat(minutes - 1)
        }
      }.call(this),
      seconds: function () {
        if (seconds > 0) {
          return this.setTimeFormat(seconds - 1)
        } else {
          return this.setTimeFormat(59.99)
        }
      }.call(this),
    }
  }

  setTimeFormat = (item) => {
    let result = item.toString().padStart(2, '0')
    return result
  }

  stopTimer = () => {
    this.setState({ timerStarted: false, timer: false })
  }

  componentWillUnmount() {
    this.props.onUpdateTime(this.props.id, this.state.minutes, this.state.seconds)
  }

  render() {
    const { id } = this.props

    if (this.state.minutes != 0 || this.state.seconds != 0) {
      return (
        <div className="timer-container">
          <button
            id={id}
            className="timer-start"
            onClick={() => {
              this.startTimer(id)
            }}
          ></button>
          <button className="timer-pause" onClick={this.stopTimer}></button>
          <p className="timer-time">
            {this.state.minutes}:{this.state.seconds}
          </p>
        </div>
      )
    } else {
      if (this.state.timer === true) {
        return <span className="time-end">Время вышло</span>
      }
    }
  }
}
