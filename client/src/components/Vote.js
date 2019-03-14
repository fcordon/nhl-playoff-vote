// Lib
import React, { Component } from 'react'
import { Grid, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getVote } from '../actions/VoteAction'

// Components
import UserVote from '../components/UserVote'
import FormVote from '../components/FormVote'

class Vote extends Component {

  constructor(props) {
    super(props)

    let userID = localStorage.getItem("userID");

    this.state = {
      userID: userID,
      isVoted: false
    }
  }

  componentDidMount() {
    this.props.getVote(this.state.userID)
    this.props.userVote.length === 1 && this.setState({ isVoted: true })
  }

  componentDidUpdate(prevState) {
    if (prevState.userVote.length !== this.props.userVote.length) {
      this.setState({ isVoted: true })
    }
  }

  render() {
    return (
      <Grid id='vote-form' fluid>
        <Col xs={12}>
          {this.state.isVoted ? this.props.userVote.map((vote, i) => <UserVote key={i} {...vote} />) : <FormVote />}
        </Col>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    userVote: state.vote.userVote
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getVote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
