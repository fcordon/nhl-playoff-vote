// Lib
import React, { Component } from 'react'
import { Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getUserSeries } from '../actions/SeriesAction'

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
    this.props.getUserSeries(this.state.userID)
    this.props.userSeries.length === 1 && this.setState({ isVoted: true })
  }

  componentDidUpdate(prevState) {
    if (prevState.userSeries.length !== this.props.userSeries.length) {
      this.setState({ isVoted: true })
    }
  }

  render() {
    return (
      <Container id='vote-form' fluid>
        <Col xs={12}>
          {this.state.isVoted ? this.props.userSeries.map((vote, i) => <UserVote key={i} {...vote} match={i} />) : <FormVote />}
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userSeries: state.series.userSeries
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserSeries
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
