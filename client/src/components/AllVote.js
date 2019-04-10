// Lib
import React, { Component } from 'react'
import { Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getUserSeries, getAllUserSeries } from '../actions/SeriesAction'
import { getAllClassement } from '../actions/ClassementAction'

//Components
import DisplayVote from './DisplayVote'

class AllVote extends Component {

  constructor(props) {
    super(props)

    this.props.getUserSeries(localStorage.getItem("userID"))
    this.props.getAllUserSeries()
    this.props.getAllClassement()

    this.state = {
      isVoted: false
    }
  }

  componentDidMount() {
    this.props.userVote.length > 0 && this.setState({ isVoted: true })
  }

  componentDidUpdate(prevState) {
    if (prevState.allVote.length !== this.props.allVote.length) {
      this.setState({ isVoted: true })
    }
  }

  render() {
    return (
      <Container id='all-votes' fluid>
        <Col xs={12}>
          {this.state.isVoted ? this.props.classement.map((users, i) => <DisplayVote key={i} {...users}/>) : <p>Il faut que tu vote d'abord !</p>}
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userVote: state.series.userSeries,
    classement: state.classement.allClassement,
    allVote: state.series.allUserSeries
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserSeries, getAllUserSeries,
    getAllClassement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllVote);
