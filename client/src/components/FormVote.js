// Lib
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getSeries, postSeries } from '../actions/SeriesAction'

// Components
import nhlLogo from '../images/nhl.svg'

class FormVote extends Component {
  constructor(props, context) {
    super(props, context)

    this.props.getSeries()

    this.state = {
      vote: [],
      isValid: '',
      errors: ''
    }
  }

  processBdd() {
    this.state.vote.map((votes, i) => {
      this.props.postSeries(votes)
      return votes
    })
  }

  onFormSubmit(e) {
    e.preventDefault()

    this.props.series.map((serie, i) => {
      let selectTeams1 = document.getElementById(serie.team1.id)
      let selectTeams2 = document.getElementById(serie.team2.id)
      let valueTeams1 = parseInt(selectTeams1.value)
      let valueTeams2 = parseInt(selectTeams2.value)

      if (valueTeams1 === valueTeams2) {
        this.setState({ errors: 'Attention tu as deux équipes égalités' })
        return this.state.errors
      } else {
        this.state.vote.push({
          'userID': localStorage.getItem('userID'),
          'seriesId': serie._id,
          'team1': {
            'name': serie.team1.name,
            'img': serie.team1.img,
            'score': valueTeams1
          },
          'team2': {
            'name': serie.team2.name,
            'img': serie.team2.img,
            'score': valueTeams2
          },
          'winner': valueTeams1 > valueTeams2 ? 'team1' : 'team2',
          'diff': valueTeams1 - valueTeams2
        })
        return this.state.vote
      }
    })

    this.processBdd()
  }

  render() {
    return (
      <Col xs={12}>
        <Card>
          <Card.Header>
            <Card.Title>
              <img className='nhl-logo' src={nhlLogo} alt='NHL Logo' />
              C'est le moment de voter pour les series
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.onFormSubmit.bind(this)}>
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
                            <Form.Group>
                              <Form.Control as="select" id={serie.team1.id}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col xs={12} md={2} className='align-center'>
                          <p className='series-versus'>VS</p>
                        </Col>
                        <Col xs={12} md={4} lg={3} className='form-series-col'>
                          <Col xs={6} md={4}>
                            <Form.Group>
                              <Form.Control as="select" id={serie.team2.id}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </Form.Control>
                            </Form.Group>
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
              <Col xs={12} className='align-center'>
                <Button type="submit">Submit</Button>
                {this.state.errors !== '' && (<div className="invalid-feedback">{this.state.errors}</div>)}
              </Col>
            </Form>
          </Card.Body>
          {this.state.isValid !== '' && (<div className="valid-feedback">{this.state.isValid}</div>)}
        </Card>
      </Col>
    )
  }
}

FormVote.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = state => {
  return {
    series: state.series.series
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getSeries, postSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormVote);
