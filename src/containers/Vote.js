// Lib
import React, { Component } from 'react'
import { Grid, Panel, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getTeams } from "../actions/TeamsAction"

// Components
import nhlLogo from '../images/nhl.svg'
import { VoteForm } from '../components/VoteForm'

class Vote extends Component {

    constructor(props) {
        super(props)

        this.props.getTeams()
    }

    render() {
        return (
            <Grid id='vote-form' fluid>
                <Col xs={12}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h2"><img className='nhl-logo' src={nhlLogo} alt='NHL Logo' /> Teams</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form>
                                {this.props.teams.map((teams) => <VoteForm key={teams.id} {...teams} />)}
                            </Form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Grid>
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
