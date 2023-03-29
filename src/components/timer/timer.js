import React from 'react'
import './timer.css'

export default class Timer extends React.Component {
  state = {
    minutes: this.props.timerMinutes,
    seconds: this.props.timerSeconds,
    timer: false,
    timerOn: false,
  }

  startTimer = () => {
    if (this.state.timer === true) {
      throw new Error('Timer alredy works')
    }

    this.setState({ timerOn: true, timer: true })

    const formatTime = (item) => {
      return item.toString().padStart(2, '0')
    }

    const timeChange = setInterval(() => {
      if (this.state.timerOn) {
        this.setState(({ minutes, seconds }) => {
          return {
            minutes: (function () {
              if (seconds != 0) {
                return formatTime(minutes)
              } else {
                return formatTime(minutes - 1)
              }
            })(),
            seconds: (function () {
              if (seconds > 0) {
                return formatTime(seconds - 1)
              } else {
                return formatTime(59)
              }
            })(),
          }
        })
      }
      if (!this.state.timer || (this.state.minutes == 0 && this.state.seconds == 0)) {
        clearInterval(timeChange)
      }
    }, 1000)
  }

  stopTimer = () => {
    this.setState({ timerOn: false, timer: false })
  }

  render() {
    if (this.state.minutes != 0 || this.state.seconds != 0) {
      return (
        <div className="timer-container">
          <button
            className="timer-start"
            onClick={() => {
              this.startTimer()
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
