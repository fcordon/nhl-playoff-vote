// Lib
import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTeams } from '../actions/TeamsAction'

class DisplayVote extends Component {
  constructor(props) {
    super(props)

    this.props.getTeams()
  }

  render() {
    const teamsSelected = (this.props.allTeams.map((team, i) => {
      let teamsArray = this.props.teams
      let teamsIndex = teamsArray.indexOf(team._id)

      if (teamsIndex !== -1) return (<Col xs={12} md={4} key={i} className='user-vote-list-item'><img className="teams-logo" src={team.img} alt={team.name} /> {team.name}</Col>)
      return true
    }))
    return (
      <Card>
        <Card.Header>
          <Card.Title>Vote de {this.props.userPseudo}</Card.Title>
        </Card.Header>
        <Card.Body className='user-vote-list'>
          <Row>
            {teamsSelected}
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    allTeams: state.teams.teams
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getTeams
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVote);
