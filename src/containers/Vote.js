import React, { Component } from 'react'
import { Panel, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTeams } from "../actions/TeamsAction"

import { VoteTable } from '../components/VoteTable'

class Vote extends Component {

    constructor(props) {
        super(props)

        this.props.getTeams()
        console.log('this.props.teams : ', this.props.teams)
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h2">Teams</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <h1>Coucou</h1>
                    <Table>
                        <tbody>
                            {this.props.teams.map((teams) => <VoteTable key={teams.id} {...teams} />)}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>
        )
    }
}

    const mapStateToProps = state => {
        return {
            teams: state.teams.teams
        }
    }

    const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            getTeams
        }, dispatch);
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Vote);
