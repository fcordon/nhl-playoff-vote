// Lib
import React, { Component } from 'react'
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form'
import { Card, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
      'teamsSelected': [],
      'count': 16,
      'errors': '',
      'isValid': ''
    }
  }

  onTeamChange(e) {
    const teamId = e.target.id
    const checked = e.target.checked
    let teamsArray = [...this.state.teamsSelected]

    if(checked) {
      teamsArray.push(teamId)
      this.setState({
        'count': this.state.count - 1
      })
    }
    else {
      let teamIndex = teamsArray.indexOf(teamId)
      teamIndex !== -1 && teamsArray.splice(teamIndex, 1)
      this.setState({
        'count': this.state.count + 1
      })
    }

    this.setState({
      'teamsSelected': teamsArray,
      'errors': ''
    })
  }

  onFormSubmit(e) {
    e.preventDefault()
    let teamsLength = this.state.teamsSelected.length

    if(teamsLength < 16) {
      let teamsDiff = 16 - teamsLength
      this.setState({
        'errors': 'Il te manque ' + teamsDiff + ' équipe(s)'
      })
    } else if(teamsLength > 16) {
      let teamsDiff = teamsLength - 16
      this.setState({
        'errors': 'Tu as sélectionné ' + teamsDiff + ' équipe(s) en trop'
      })
    } else {
      let vote = {
        'userID': localStorage.getItem('userID'),
        'userPseudo': localStorage.getItem('userPseudo'),
        'teams': this.state.teamsSelected
      }

      let classement = {
        'userID': localStorage.getItem('userID'),
        'userPseudo': localStorage.getItem('userPseudo'),
        'points': 0
      }

      this.props.postVote(vote)
      this.props.postClassement(classement)
      this.setState({ isValid: 'Merci ton vote est bien pris en compte' })

      setTimeout(
        function() {
          this.context.router.history.push('/classement')
        }.bind(this), 1500
      )
    }
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title><img className='nhl-logo' src={nhlLogo} alt='NHL Logo' />
          Il te reste {this.state.count > 1 ? this.state.count + ' équipes' : this.state.count + ' équipe'} à sélectionner
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          <Col xs={12}>
            {
              this.props.series.map((serie, i) => {
                return(
                  <Col xs={12} key={i} className='form-series'>
                    <img src={serie.team1.img} alt={serie.team1.name} />
                    <p>{serie.team1.name}</p>
                    <Form.Group>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </Form.Control>
                    </Form.Group>
                    <p>-</p>
                    <p>{serie.team2.score}</p>
                    <p>{serie.team2.name}</p>
                    <img src={serie.team2.img} alt={serie.team2.name} />
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
