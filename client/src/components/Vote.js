// Lib
import React, { Component } from 'react'
import { Grid, Panel, Col, Form, FormGroup, Checkbox, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getTeams } from "../actions/TeamsAction"

// Components
import nhlLogo from '../images/nhl.svg'
// import { VoteForm } from '../components/VoteForm'

class Vote extends Component {

    constructor(props) {
        super(props)

        this.props.getTeams()

        this.state = {
            'teamsSelected': [],
            'errors': ''
        }
    }

    onTeamChange(e) {
        const name = e.target.name
        const checked = e.target.checked
        let teamsArray = [...this.state.teamsSelected]

        if(checked)
            teamsArray.push(name)
        else {
            let teamIndex = teamsArray.indexOf(name)
            teamIndex !== -1 && teamsArray.splice(teamIndex, 1)
        }

        this.setState({
            'teamsSelected': teamsArray,
            'errors': ''
        })
    }

    onFormSubmit(e) {
        e.preventDefault()
        let teamsLength = this.state.teamsSelected.length

        if(teamsLength < 16) {
            let teamsDiff = 16 - teamsLength
            this.setState({
                'errors': 'Il te manque ' + teamsDiff + ' équipe(s)'
            })
        } else {

        }
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
                            <Form onSubmit={this.onFormSubmit.bind(this)}>
                                {this.props.teams.map((teams, i) =>
                                    <Col xs={6} md={4} lg={3} key={i}>
                                        <FormGroup>
                                            <label>
                                                <img className='teams-logo' src={teams.franchise.teamName !== 'Golden Knights' ? 'https://www.nhl.com/site-core/images/team/logo/current/' + teams.id + '_dark.svg' : 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/54.svg'} alt={teams.name} />
                                                {teams.name}
                                                <Checkbox
                                                    className='form-checkbox'
                                                    id={teams.id}
                                                    title={teams.name}
                                                    name={teams.name}
                                                    onChange={this.onTeamChange.bind(this)}
                                                    value={teams.name}
                                                ></Checkbox>
                                            </label>
                                        </FormGroup>
                                    </Col>
                                )}
                                <Col xs={12} className='align-center'>
                                    <Button type="submit">Submit</Button>
                                    {this.state.errors !== '' && (<div className="invalid-feedback">{this.state.errors}</div>)}
                                </Col>
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
