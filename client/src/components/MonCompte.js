import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Col, Button } from 'react-bootstrap'

import { getUser } from '../actions/Authentication'
import { getVote, getAllVote } from '../actions/VoteAction'
import { updateClassement } from '../actions/ClassementAction'

import ChangeUser from '../components/ChangeUser'
import UserVote from '../components/UserVote'

export class MonCompte extends Component {

  constructor(props) {
    super(props)
    let userPseudo = localStorage.getItem("userPseudo")
    let userID = localStorage.getItem("userID")

    this.state = {
      userPseudo: userPseudo,
      userID: userID,
      modifyName: false,
      isAdmin: false,
      qualifying: ['5c17bb3bc7924a0b36b6de71', '5c17bb3bc7924a0b36b6de68', '5c17bb3bc7924a0b36b6de73', '5c17bb3bc7924a0b36b6de69', '5c17bb3bc7924a0b36b6de6e', '5c17bb3bc7924a0b36b6de6a', '5c17bb3bc7924a0b36b6de70', '5c17bb3bc7924a0b36b6de72', '5c17bb3bc7924a0b36b6de74', '5c17bb3bc7924a0b36b6de6d', '5c17bb3bc7924a0b36b6de67', '5c17bb3bc7924a0b36b6de6b', '5c17bb3bc7924a0b36b6de6c', '5c17bb3bc7924a0b36b6de6f', '5c17bb3bc7924a0b36b6de75', '5c17bb3bc7924a0b36b6de84']
    }
  }

  componentDidMount() {
    const userID = this.state.userID
    this.props.getUser({ id: userID })
    this.props.getVote(userID)
    this.props.getAllVote()
    this.state.userPseudo === 'C Fab' && this.setState({ isAdmin: true })
  }

  getPoints() {
    this.props.allVote.map((vote, i) => {
      let points = 0
      vote.teams.map((team, i) => {
        let teamsMatch = this.state.qualifying.indexOf(team)
        if(teamsMatch !== -1) points = points + 1
        return points
      })
      this.props.updateClassement(vote.userID, {'points':points})
      return points
    })
  }

  render() {
    return (
      <Grid id="mon-compte" className="vertical-middle" fluid>
        <Col xs={12}>
          <h1 className="align-center">Voici ton compte {this.state.userPseudo}</h1>
          {this.props.userData.map((user, i) => <ChangeUser key={i} {...user} />)}
        </Col>
        <Col xs={12}>
          {this.props.userVote.map((vote, i) => <UserVote key={i} {...vote} />)}
        </Col>
        {this.state.isAdmin ? <Col xs={12} className="align-center"><Button onClick={this.getPoints.bind(this)}>Calculer les points</Button></Col> : null}
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
    userData: state.auth.user,
    userVote: state.vote.userVote,
    allVote: state.vote.allVote
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
    getVote, getAllVote,
    updateClassement
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MonCompte)
