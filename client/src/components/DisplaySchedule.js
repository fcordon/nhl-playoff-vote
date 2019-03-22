// Lib
import React, { Component } from 'react'
import { Panel, Col } from 'react-bootstrap'

export default class DisplaySchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    }
  }

  formatDate(dates) {
    let propsDate = dates.split('-')
    let monthIndex = propsDate[1].slice(1) - 1

    return propsDate[2] + ' ' + this.state.months[monthIndex] + ' ' + propsDate[0]
  }

  teamsLogo(teamName) {
    // let teamIndex = this.props.teams.indexOf()
  }

  render() {
    return (
      <Panel.Body className='games'>
        <Col xs={12} className='games-date'>{this.formatDate(this.props.date)}</Col>
        <Col xs={12} className='games-teams'>
          {this.props.games.map((game, i) => <img key={i} src={this.teamsLogo(game.teams.away.team.name)} alt={game.teams.away.team.name} />)}
        </Col>
      </Panel.Body>
    )
  }
}
