import React, { Component } from 'react'

export class VoteTable extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
            </tr>
        )
    }
}
