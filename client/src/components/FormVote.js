// Lib
import React, { Component } from 'react'
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form'
import { Card, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { findDOMNode } from 'react-dom'

// Actions
import { getSeries } from '../actions/SeriesAction'
import { postVote } from '../actions/VoteAction'
import { postClassement } from '../actions/ClassementAction'

// Components
import nhlLogo from '../images/nhl.svg'

class FormVote extends Component {
  constructor(props, context) {
    super(props, context)

    this.props.getSeries()

    this.state = {
      vote: [],
      errors: ''
    }
  }

  processBdd() {
    this.state.vote.map((votes, i) => {
      console.log('votes : ', votes)

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

      this.state.vote.push({
        'seriesId': serie._id,
        'team1': {
          'score': valueTeams1
        },
        'team2': {
          'score': valueTeams2
        },
        'winner': valueTeams1 > valueTeams2 ? 'team1' : 'team2',
        'diff': valueTeams1 - valueTeams2
      })

      return this.state.vote
    })
    this.processBdd()
  }

  render() {
    return (
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
                    <Col xs={12} key={i} className='form-series'>
                      <Col xs={3} className='align-center'>
                        <img src={serie.team1.img} alt={serie.team1.name} />
                        <p className='series-teams-name'>{serie.team1.name}</p>
                      </Col>
                      <Col xs={1}>
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
                      <Col xs={2} className='align-center'>
                        <p className='series-versus'>VS</p>
                      </Col>
                      <Col xs={1}>
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
                      <Col xs={3} className='align-center'>
                        <img src={serie.team2.img} alt={serie.team2.name} />
                        <p className='series-teams-name'>{serie.team2.name}</p>
                      </Col>
                    </Col>
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
    getSeries,
    postVote,
    postClassement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormVote);
