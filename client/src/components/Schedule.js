// Lib
import React, { Component } from 'react'
import { Grid, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getSchedule } from '../actions/ScheduleAction'
import { getTeams } from '../actions/TeamsAction'

//Components
import DisplaySchedule from './DisplaySchedule'

class Schedule extends Component {

  constructor(props) {
    super(props)

    this.props.getSchedule()
    this.props.getTeams()
  }

  render() {
    return (
      <Grid id='vote-form' fluid>
        <Col xs={12}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h2">Calendrier des matches</Panel.Title>
            </Panel.Heading>
            {this.props.schedule.map((schedule, i) => <DisplaySchedule key={i} {...schedule} teams={this.props.allTeams} />)}
          </Panel>
        </Col>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule.schedule,
    allTeams: state.teams.teams
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getSchedule,
    getTeams
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
