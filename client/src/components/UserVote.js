import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

// Components
import nhlLogo from '../images/nhl.svg'

export default class UserVote extends Component {
  render() {
    return (
      <Col xs={12} md={6}>
        <Card>
          <Card.Header>
            <Card.Title>
              <img className='nhl-logo' src={nhlLogo} alt='NHL Logo' />
              Match {this.props.match + 1}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className='user-series-vote align-center'>
              <Col xs={6} md={4} className={this.props.team1.score === 4 && 'user-series-vote-score font-bold'}>
                <img src={this.props.team1.img} alt={this.props.team1.name} />
                <p>{this.props.team1.name}</p>
              </Col>
              <Col xs={3} md={1} className={this.props.team1.score === 4 ? 'user-series-vote-score font-bold' : 'user-series-vote-score'}>
                {this.props.team1.score}
              </Col>
              <Col xs={12} md={2} className='user-series-vote-score'>
                VS
              </Col>
              <Col xs={3} md={1} className={this.props.team2.score === 4 ? 'user-series-vote-score font-bold' : 'user-series-vote-score'}>
                {this.props.team2.score}
              </Col>
              <Col xs={6} md={4} className={this.props.team2.score === 4 && 'user-series-vote-score font-bold'}>
                <img src={this.props.team2.img} alt={this.props.team2.name} />
                <p>{this.props.team2.name}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
