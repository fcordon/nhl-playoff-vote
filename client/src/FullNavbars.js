import React, { Component }  from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from './actions/Authentication'

class FullNavbars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: localStorage.getItem('jwtToken') !== null ? true : false,
      isAdmin: localStorage.getItem('userPseudo') === 'C Fab' ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.auth.isAuthenticated === true && this.setState({isAuthenticated: true})
    nextProps.auth.user[0].pseudo === 'C Fab' && this.setState({isAdmin: true})
    console.log(nextProps)
  }

  onLogout() {
    this.props.logoutUser()
  }

  render() {
    const authNav = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <NavDropdown title="A toi de jouer" id="basic-nav-dropdown">
          <LinkContainer to={"/vote"}>
            <Nav.Link eventKey={0}>Vote !</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/quiavotequoi"}>
            <Nav.Link eventKey={1}>Qui à voté quoi !</Nav.Link>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to={"/monCompte"}>
            <Nav.Link eventKey={2}>Mon Compte</Nav.Link>
          </LinkContainer>
        </NavDropdown>
          <LinkContainer to={"/classement"}>
            <Nav.Link eventKey={3}>Classement</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/calendrier"}>
            <Nav.Link eventKey={4}>Calendrier</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/draft"}>
            <Nav.Link eventKey={5}>Draft</Nav.Link>
          </LinkContainer>
          {this.state.isAdmin &&
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <LinkContainer to={"/series"}>
                <Nav.Link eventKey={6}>Ajouter series</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/updateseries"}>
                <Nav.Link eventKey={7}>Update series</Nav.Link>
              </LinkContainer>
            </NavDropdown>
          }
        </Nav>
        <Nav.Link eventKey={4} onClick={this.onLogout.bind(this)}>Me déconnecter</Nav.Link>
      </Navbar.Collapse>
    )
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="navbar-brand">NHL vote app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {this.state.isAuthenticated && authNav}
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
