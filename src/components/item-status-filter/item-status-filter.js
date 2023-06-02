import React from 'react'

import './item-status-filter.css'
const StatusFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
    { name: 'clear', label: 'Clear completed' },
  ]

  return (
    <div className="status-container">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name && filter != 'clear'
        const isClear = name === 'clear' ? 'clear' : ''
        const clazz = isActive ? ' active' : ''
        return (
          <div className="button-wrapper" key={`div${name}`}>
            <button
              type="button"
              className={`status-btn ${clazz}${isClear}`}
              onClick={() => {
                onFilterChange(name)
              }}
            >
              {label}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default StatusFilter

// export default class StatusFilter extends React.Component {
//   buttons = [
//     { name: 'all', label: 'All' },
//     { name: 'active', label: 'Active' },
//     { name: 'done', label: 'Done' },
//     { name: 'clear', label: 'Clear completed' },
//   ]

//   render() {
//     const { filter, onFilterChange } = this.props
//     return (
//       <div className="status-container">
//         {this.buttons.map(({ name, label }) => {
//           const isActive = filter === name && filter != 'clear'
//           const isClear = name === 'clear' ? 'clear' : ''
//           const clazz = isActive ? ' active' : ''
//           return (
//             <div className="button-wrapper" key={`div${name}`}>
//               <button
//                 type="button"
//                 className={`status-btn ${clazz}${isClear}`}
//                 onClick={() => {
//                   onFilterChange(name)
//                 }}
//               >
//                 {label}
//               </button>
//             </div>
//           )
//         })}
//       </div>
//     )
//   }
// }
