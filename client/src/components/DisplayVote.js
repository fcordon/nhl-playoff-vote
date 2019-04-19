// Lib
import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllUserSeries } from '../actions/SeriesAction'

class DisplayVote extends Component {
  constructor(props) {
    super(props)

    this.props.getAllUserSeries()
  }

  render() {
    const usersVote = (this.props.allVote.map((votes, i) => {
      if (votes.userID === this.props.userID) {
        return (
          <Col xs={12} md={6} key={i} className='align-center'>
            <p>
              <img src={votes.team1.img} alt={votes.team1.name} width='25%' /> &nbsp;&nbsp;
              <span className={votes.team1.score === 4 ? 'font-bold' : ''}>{votes.team1.score}</span>
              &nbsp;&nbsp; Vs &nbsp;&nbsp;
              <span className={votes.team2.score === 4 ? 'font-bold' : ''}>{votes.team2.score}</span>
              &nbsp;&nbsp;
              <img src={votes.team2.img} alt={votes.team2.name} width='25%' />
            </p>
          </Col>
        )
      }
      return true
    }))
    return (
      <Card>
        <Card.Header>
          <Card.Title>Vote de {this.props.userPseudo}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            {usersVote}
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    allVote: state.series.allUserSeries
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllUserSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVote);
