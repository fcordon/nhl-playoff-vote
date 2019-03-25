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

  teamLogo(teamId) {
    let teamLogo = ''

    if(teamId === 54) {
      teamLogo = 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/54.svg'
    } else {
      teamLogo = 'https://www.nhl.com/site-core/images/team/logo/current/'+teamId+'_dark.svg'
    }

    return teamLogo
  }

  render() {
    return (
      <Panel.Body className='games'>
        <Col xs={12} className='games-date'>{this.formatDate(this.props.date)}</Col>
        {
          this.props.games.map((game, i) => {
            return (
              <Col key={i} xs={12} className='games-teams'>
                <img src={this.teamLogo(game.teams.away.team.id)} alt='teams logo' />
                <p>{game.teams.away.team.name}</p>
                <p> @ </p>
                <img src={this.teamLogo(game.teams.home.team.id)} alt='teams logo' />
                <p>{game.teams.home.team.name}</p>
              </Col>
            )
          })
        }
      </Panel.Body>
    )
  }
}
