import React, { Component } from 'react'

export class ClassementTable extends Component {
  render() {
    return (
      <tr>
        <td></td>
        <td>{this.props.userPseudo}</td>
        <td>{this.props.points}</td>
      </tr>
    )
  }
}
