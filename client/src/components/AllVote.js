// Lib
import React, { Component } from 'react'
import { Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getVote, getAllVote } from '../actions/VoteAction'

//Components
import DisplayVote from './DisplayVote'

class Vote extends Component {

  constructor(props) {
    super(props)

    this.props.getVote(localStorage.getItem("userID"))
    this.props.getAllVote()

    this.state = {
      isVoted: false
    }
  }

  componentDidMount() {
    this.props.userVote.length === 1 && this.setState({ isVoted: true })
  }

  componentDidUpdate(prevState) {
    if (prevState.userVote.length !== this.props.userVote.length) {
      this.setState({ isVoted: true })
    }
  }

  render() {
    return (
      <Container id='vote-form' fluid>
        <Col xs={12}>
          {this.state.isVoted ? this.props.allVote.map((votes, i) => <DisplayVote key={i} {...votes}/>) : <p>Il faut que tu vote d'abord !</p>}
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userVote: state.vote.userVote,
    allVote: state.vote.allVote
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getVote, getAllVote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
