import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

// Components
import easternLogo from '../images/Eastern_Conference.png'
import westernLogo from '../images/Western_Conference.png'

export default class UserVote extends Component {
  render() {
    const reasultSeries = this.props.series.map((serie, i) => {
      let team1Name = serie.team1.name
      let team1Score = serie.team1.score
      let team2Name = serie.team2.name
      let team2Score = serie.team2.score

      return (
        serie._id === this.props.seriesId && <p key={i}><span className={team1Score > team2Score ? 'font-bold' : null}>{team1Name}&nbsp;{team1Score}</span> - <span className={team1Score < team2Score ? 'font-bold' : null}>{team2Score}&nbsp;{team2Name}</span></p>
      )
    })
    return (
      <Col xs={12} md={6}>
        <Card>
          <Card.Header>
            <Card.Title>
              {this.props.match < 1 ? <img className='nhl-logo' src={easternLogo} alt='NHL Logo' /> : <img className='nhl-logo' src={westernLogo} alt='NHL Logo' />}
              Finale de Conférence {this.props.match === 0 ? 'Est' : 'Ouest'}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className='user-series-vote'>
              <Col xs={4}>
                <img src={this.props.team1.img} alt={this.props.team1.name} />
              </Col>
              <Col xs={7} className={this.props.team1.score === 4 && 'user-series-vote-score font-bold'}>
                <p>{this.props.team1.name} {this.props.team1.score}</p>
              </Col>
            </Row>
            <Row className='user-series-vote'>
              <Col xs={4}>
                <img src={this.props.team2.img} alt={this.props.team2.name} />
              </Col>
              <Col xs={7} className={this.props.team2.score === 4 && 'user-series-vote-score font-bold'}>
                <p>{this.props.team2.name} {this.props.team2.score}</p>
              </Col>
            </Row>
            <Row>
              <Col className='align-center'>
                {reasultSeries}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
