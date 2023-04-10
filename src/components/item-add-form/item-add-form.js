import React, { Component } from 'react'

import './item-add-form.css'
// import { th } from 'date-fns/locale'

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
    if (isNaN(+e.target.value)) {
      e.target.classList.add('error')
    } else {
      e.target.classList.remove('error')
    }
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3)
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
          className="addtimer-item"
          placeholder="Min"
          onChange={(e) => {
            this.onSetTime(e, 'minutes')
          }}
        ></input>
        <input
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
