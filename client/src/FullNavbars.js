import React, { Component }  from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from './actions/Authentication'

class FullNavbars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: localStorage.getItem('jwtToken') !== null ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated === true) this.setState({isAuthenticated: true})
  }

  onLogout() {
    this.props.logoutUser()
  }

  render() {
    const authNav = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={"/vote"}>
            <Nav.Link eventKey={0}>Vote !</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/classement"}>
            <Nav.Link eventKey={1}>Classement</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/quiavotequoi"}>
            <Nav.Link eventKey={2}>Qui à voté quoi !</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to={"/monCompte"}>
            <Nav.Link eventKey={3}>Mon Compte</Nav.Link>
          </LinkContainer>
          <Nav.Link eventKey={4} onClick={this.onLogout.bind(this)}>Me déconnecter</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    )
    return (
      <Navbar bg="light" expand="lg">
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
