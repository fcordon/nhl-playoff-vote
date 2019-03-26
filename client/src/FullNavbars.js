import React, { Component }  from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from './actions/Authentication'

class FullNavbars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.auth.isAuthenticated !== this.state.isAuthenticated) {
      this.setState({ isAuthenticated: true })
      return true
    }
    return false
  }

  onLogout() {
    this.props.logoutUser()
  }

  render() {
    const authNav = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={"/vote"}>
            <NavItem eventKey={0}>Vote !</NavItem>
          </LinkContainer>
          <LinkContainer to={"/classement"}>
            <NavItem eventKey={1}>Classement</NavItem>
          </LinkContainer>
          <LinkContainer to={"/quiavotequoi"}>
            <NavItem eventKey={2}>Qui a voté quoi !</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to={"/monCompte"}>
            <NavItem eventKey={3}>Mon Compte</NavItem>
          </LinkContainer>
          <NavItem eventKey={4} onClick={this.onLogout.bind(this)}>Me déconnecter</NavItem>
        </Nav>
      </Navbar.Collapse>
    )
    return (
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand className="navbar-brand">NHL vote app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {this.state.isAuthenticated ? authNav : null}
      </Navbar>
    )
  }
}

FullNavbars.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(FullNavbars);
