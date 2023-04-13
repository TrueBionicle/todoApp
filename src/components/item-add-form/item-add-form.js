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

  onSetTime = (e, option) => {
    this.setState({
      [option]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAddItem(this.state.label, this.state.minutes, this.state.seconds)
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
        <input
          type="number"
          min="0"
          max="999"
          className="addtimer-item"
          placeholder="Min"
          onChange={(e) => {
            this.onSetTime(e, 'minutes')
          }}
        ></input>
        <input
          type="number"
          min="0"
          max="999"
          className="addtimer-item"
          placeholder="Sec"
          onChange={(e) => {
            this.onSetTime(e, 'seconds')
          }}
        ></input>
        <button className="kostil"></button>
      </form>
    )
  }
}
