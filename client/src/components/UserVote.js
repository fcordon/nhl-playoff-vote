import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSeries } from '../actions/SeriesAction'

// Components
import nhlLogo from '../images/nhl.svg'

class UserVote extends Component {
  constructor(props) {
    super(props)

    this.props.getSeries()
  }

  render() {
    const teamsSelected = (this.props.series.map((serie, i) => {
      let teamsArray = this.props.userSeries
      let teamsIndex = teamsArray.indexOf(serie._id)

      // if (teamsIndex !== -1) return ()
      return true
    }))

    return (
      <Col xs={12} md={{ span: 8, offset: 2 }} className='user-vote'>
        <Card>
          <Card.Header>
            <Card.Title>
              <img className='nhl-logo' src={nhlLogo} alt='NHL Logo' />
              C'est le moment de voter pour les series
            </Card.Title>
          </Card.Header>
          <Card.Body>
              <Col xs={12}>
                {
                  this.props.series.map((serie, i) => {
                    return(
                      <Row key={i} className='form-series'>
                        <Col xs={12} className='align-center'><h3>Match {i + 1}</h3></Col>
                        <Col xs={12} md={4} lg={3} className='form-series-col'>
                          <Col xs={6} md={8} className='align-center'>
                            <img src={serie.team1.img} alt={serie.team1.name} />
                            <p className='series-teams-name'>{serie.team1.name}</p>
                          </Col>
                          <Col xs={6} md={4}>

                          </Col>
                        </Col>
                        <Col xs={12} md={2} className='align-center'>
                          <p className='series-versus'>VS</p>
                        </Col>
                        <Col xs={12} md={4} lg={3} className='form-series-col'>
                          <Col xs={6} md={4}>

                          </Col>
                          <Col xs={6} md={8} className='align-center'>
                            <img src={serie.team2.img} alt={serie.team2.name} />
                            <p className='series-teams-name'>{serie.team2.name}</p>
                          </Col>
                        </Col>
                      </Row>
                    )
                  })
                }
              </Col>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    series: state.series.series
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVote);
