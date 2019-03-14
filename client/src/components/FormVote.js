// Lib
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Panel, Col, Form, FormGroup, Checkbox, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getTeams } from '../actions/TeamsAction'
import { postVote } from '../actions/VoteAction'
import { postClassement } from '../actions/ClassementAction'

// Components
import nhlLogo from '../images/nhl.svg'

class FormVote extends Component {
  constructor(props, context) {
    super(props, context)

    this.props.getTeams()

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
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h2"><img className='nhl-logo' src={nhlLogo} alt='NHL Logo' />
            Il te reste {this.state.count > 1 ? this.state.count + ' équipes' : this.state.count + ' équipe'} à sélectionner
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form onSubmit={this.onFormSubmit.bind(this)}>
            {this.props.teams.map((teams, i) =>
              <Col xs={12} md={4} lg={3} key={i}>
                <FormGroup>
                  <label>
                    <img className='teams-logo' src={teams.img} alt={teams.name} />
                    {teams.name}
                    <Checkbox
                      className='form-checkbox'
                      id={teams._id}
                      name={teams.name}
                      onChange={this.onTeamChange.bind(this)}
                      value={teams.name}
                      ></Checkbox>
                  </label>
                </FormGroup>
              </Col>
            )}
            <Col xs={12} className='align-center'>
              <Button type="submit">Submit</Button>
              {this.state.errors !== '' && (<div className="invalid-feedback">{this.state.errors}</div>)}
            </Col>
          </Form>
        </Panel.Body>
        {this.state.isValid !== '' && (<div className="valid-feedback">{this.state.isValid}</div>)}
      </Panel>
    )
  }
}

FormVote.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = state => {
  return {
    teams: state.teams.teams
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getTeams,
    postVote,
    postClassement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormVote);
