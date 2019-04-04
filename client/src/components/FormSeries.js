// Lib
import React, { Component } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getTeams } from '../actions/TeamsAction'
import { postNhlSeries } from '../actions/SeriesAction'

class FormSeries extends Component {
  constructor(props) {
    super(props)

    this.props.getTeams()
  }

  processBdd(team1, team2) {
    let insertBdd = {
      'team1': team1,
      'team2': team2,
      'winner': '',
      'diff': 0
    }

    this.props.postNhlSeries(insertBdd)
  }

  onFormSubmit(e) {
    e.preventDefault()

    let getTeam1 = document.getElementById('team1').value
    let getTeam2 = document.getElementById('team2').value
    let team1 = {}
    let team2 = {}

    this.props.teams.map((team, i) => {
      if(getTeam1 === team.name) {
        team1 = {
          'id': team._id,
          'name': team.name,
          'img': team.img,
          'score': 0
        }
      }
      if(getTeam2 === team.name) {
        team2 = {
          'id': team._id,
          'name': team.name,
          'img': team.img,
          'score': 0
        }
      }
      return [team1, team2]
    })

    this.processBdd(team1, team2)
  }

  render() {
    const optionTeams = this.props.teams.map((team, i) => <option key={i}>{team.name}</option>)
    return (
      <Col xs={12} md={{ span:6 , offset:3 }}>
        <Card>
          <Card.Header>
            <Card.Title>
              Mise en place des series
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.onFormSubmit.bind(this)}>
              <Col xs={12} className='align-center'><h3>Match</h3></Col>
              <Row className='form-series'>
                <Col xs={5}>
                  <Form.Group>
                    <Form.Control as="select" id='team1'>
                      {optionTeams}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={2} className='align-center'>
                  <p className='series-versus'>VS</p>
                </Col>
                <Col xs={5}>
                  <Form.Group>
                    <Form.Control as="select" id='team2'>
                      {optionTeams}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Col xs={12} className='align-center'>
                <Button type="submit">Submit</Button>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </Col>
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
    getTeams,
    postNhlSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSeries);
