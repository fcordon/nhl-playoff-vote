// Lib
import React, { Component } from 'react'
import { Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getAllVote } from '../actions/VoteAction'

//Components
import DisplayVote from './DisplayVote'

class Vote extends Component {

  constructor(props) {
    super(props)
    this.props.getAllVote()
  }

  render() {
    return (
      <Container id='all-votes' fluid>
        <Col xs={12}>
          {this.props.allVote.map((votes, i) => <DisplayVote key={i} {...votes}/>)}
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    allVote: state.vote.allVote
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllVote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
