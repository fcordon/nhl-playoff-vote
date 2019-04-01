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

    this.state = {
      qualifying: ['5c17bb3bc7924a0b36b6de73',
      '5c17bb3bc7924a0b36b6de6c',
      '5c17bb3bc7924a0b36b6de74',
      '5c17bb3bc7924a0b36b6de68',
      '5c17bb3bc7924a0b36b6de70',
      '5c17bb3bc7924a0b36b6de6b',
      '5c17bb3bc7924a0b36b6de81',
      '5c17bb3bc7924a0b36b6de71',
      '5c17bb3bc7924a0b36b6de79',
      '5c17bb3bc7924a0b36b6de80',
      '5c17bb3bc7924a0b36b6de83',
      '5c17bb3bc7924a0b36b6de77',
      '5c17bb3bc7924a0b36b6de78',
      '5c17bb3bc7924a0b36b6de85',
      '5c17bb3bc7924a0b36b6de7e',
      '5c17bb3bc7924a0b36b6de7a']
    }
  }

  render() {
    const teamsSelected = (this.props.allTeams.map((team, i) => {
      let teamsArray = this.props.teams
      let teamsIndex = teamsArray.indexOf(team._id)
      let teamsQualifying = this.state.qualifying.indexOf(team._id)

      if (teamsIndex !== -1 && teamsQualifying !== -1) {
        return (<Col xs={12} md={4} key={i} className='user-vote-list-item qualifying'><img className="teams-logo" src={team.img} alt={team.name} /> {team.name}</Col>)
      } else if (teamsIndex !== -1) {
        return (<Col xs={12} md={4} key={i} className='user-vote-list-item'><img className="teams-logo" src={team.img} alt={team.name} /> {team.name}</Col>)
      }
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
