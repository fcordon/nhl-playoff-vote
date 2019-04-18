// Lib
import React, { Component } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getSeries, updateSeries } from '../actions/SeriesAction'

class UpdateSeries extends Component {
  constructor(props, context) {
    super(props, context)

    this.props.getSeries()

    this.state = {
      'update': []
    }
  }

  updateBdd() {
    this.state.update.map((votes, i) => this.props.updateSeries(votes._id, votes))
  }

  onFormSubmit(e) {
    e.preventDefault()

    this.props.series.map((serie, i) => {
      let selectTeams1 = document.getElementById(serie.team1.id)
      let selectTeams2 = document.getElementById(serie.team2.id)
      let valueTeams1 = parseInt(selectTeams1.value)
      let valueTeams2 = parseInt(selectTeams2.value)

      this.state.update.push({
        '_id': serie._id,
        'team1': {
          'name': serie.team1.name,
          'img': serie.team1.img,
          'score': valueTeams1,
          'id': serie.team1.id
        },
        'team2': {
          'name': serie.team2.name,
          'img': serie.team2.img,
          'score': valueTeams2,
          'id': serie.team2.id
        },
        'winner': valueTeams1 > valueTeams2 ? 'team1' : (valueTeams1 === valueTeams2 ? '' :'team2'),
        'diff': valueTeams1 - valueTeams2
      })
      return this.state.update
    })

    this.updateBdd()
  }

  render() {
    return (
      <Col xs={12}>
        <Card>
          <Card.Header>
            <Card.Title>
              Mise à jour des Series
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
                              <Form.Control as="input" id={serie.team1.id} defaultValue={serie.team1.score} />
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col xs={12} md={2} className='align-center'>
                          <p className='series-versus'>VS</p>
                        </Col>
                        <Col xs={12} md={4} lg={3} className='form-series-col'>
                          <Col xs={6} md={4}>
                            <Form.Group>
                              <Form.Control as='input' id={serie.team2.id} defaultValue={serie.team2.score} />
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
              </Col>
            </Form>
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
    getSeries, updateSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSeries);
