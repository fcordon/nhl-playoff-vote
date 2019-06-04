import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

class Calendrier extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schedule: []
    }
  }

  componentDidMount() {
    this.getUsersID()
    .then(res => this.setState({ schedule: res.dates }))
    .catch(err => console.log(err))
  }

  getUsersID = async () => {
    // let date = new Date()
    // let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // let getMonth = date.getMonth()
    // let realMonth = getMonth + 1
    // let month = realMonth < 10 ? '0' + realMonth : realMonth
    // let year = date.getFullYear()
    // let fullDate = year + '-' + month + '-' + day

    const callApi = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-05-27&endDate=2019-07-01')
    const response = await callApi.data

    return response
  }

  render() {
    const getSchedule = this.state.schedule.length > 0 && this.state.schedule.map((schedule, i) => {
      let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      let game = i + 1
      let teamLogoAway = 'https://www.nhl.com/site-core/images/team/logo/current/'+schedule.games[0].teams.away.team.id+'_dark.svg'
      let teamLogoHome = 'https://www.nhl.com/site-core/images/team/logo/current/'+schedule.games[0].teams.home.team.id+'_dark.svg'
      let gameDateSplit = schedule.games[0].gameDate.split('T')
      let gameDateReSplit = gameDateSplit[0].split('-')
      let gameDateDay = gameDateReSplit[2]
      let gameDateMonth = months[parseInt(gameDateReSplit[1], 10) - 1]
      let gameDateYear = gameDateReSplit[0]
      let gameDate = gameDateDay + ' ' + gameDateMonth + ' ' + gameDateYear

      return (
        <div className='calendar-section' key={i}>
          <Row>
            <Col className='calendar-section-game'>
              <p>GAME</p>
            </Col>
            <Col className='calendar-section-logo'>
              <img src={teamLogoAway} alt={schedule.games[0].teams.away.team.name} />
            </Col>
            <Col>
              <p className='calendar-section-name'>{schedule.games[0].teams.away.team.name}</p>
            </Col>
            <Col>
              <p className='calendar-section-win'>Wins : {schedule.games[0].teams.away.leagueRecord.wins}</p>
              <p>Losses : {schedule.games[0].teams.away.leagueRecord.losses}</p>
            </Col>
            <Col>
              <p className='calendar-section-score'>{schedule.games[0].teams.away.score}</p>
            </Col>
            <Col className='calendar-section-date'>
              <p>{gameDate}</p>
            </Col>
          </Row>
          <Row>
            <Col className='calendar-section-game'>
              <p><span className='calendar-section-game-number'>{game}</span></p>
            </Col>
            <Col className='calendar-section-logo'>
              <img src={teamLogoHome} alt={schedule.games[0].teams.home.team.name} />
            </Col>
            <Col>
              <p className='calendar-section-name'>{schedule.games[0].teams.home.team.name}</p>
            </Col>
            <Col>
              <p className='calendar-section-win'>Wins : {schedule.games[0].teams.home.leagueRecord.wins}</p>
              <p>Losses : {schedule.games[0].teams.home.leagueRecord.losses}</p>
            </Col>
            <Col>
              <p className='calendar-section-score'>{schedule.games[0].teams.home.score}</p>
            </Col>
            <Col>
            </Col>
          </Row>
        </div>
      )
    })
    return (
      <Col xs={12} className='calendar align-center'>
        {getSchedule}
      </Col>
    )
  }
}

export default Calendrier;
