import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Col } from 'react-bootstrap'

import { getUser } from '../actions/Authentication'

import ChangeUser from '../components/ChangeUser'

export class MonCompte extends Component {

  constructor(props) {
    super(props)
    let userPseudo = localStorage.getItem("userPseudo")
    let userID = localStorage.getItem("userID")

    this.state = {
      userPseudo: userPseudo,
      userID: userID,
      modifyName: false
    }
  }

  componentDidMount() {
    this.props.getUser({ id: this.state.userID })
  }

  render() {
    return (
      <Container id="mon-compte" className="vertical-middle" fluid>
        <Col xs={12}>
          <h1 className="align-center">Voici ton compte {this.state.userPseudo}</h1>
          {this.props.userData.map((user, i) => <ChangeUser key={i} {...user} />)}
        </Col>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    userData: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MonCompte)
