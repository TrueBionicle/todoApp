import React, { Component } from 'react'

import './item-add-form.css'

export default class ItemAddForm extends Component {
  state = {
    label: '',
    minutes: 0,
    seconds: 0,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    if (e.target.value > 999) {
      e.target.value = 999
    }
    this.setState({
      minutes: e.target.value,
    })
  }
  onSecondsChange = (e) => {
    if (e.target.value > 59) {
      e.target.value = 59
    }
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAddItem(this.state.label, this.state.minutes, this.state.seconds)
    console.log(this.state)
    this.setState({
      label: '',
      minutes: 0,
      seconds: 0,
    })
    e.target.reset()
  }

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          required
          type="text"
          maxLength="20"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
        <input type={'number'} className="addtimer-item" placeholder="Min" onChange={this.onMinutesChange}></input>
        <input type={'number'} className="addtimer-item" placeholder="Sec" onChange={this.onSecondsChange}></input>
        <button className="kostil"></button>
      </form>
    )
  }
}
