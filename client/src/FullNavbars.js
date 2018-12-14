import React, { Component }  from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from './actions/Authentication';

class FullNavbars extends Component {

    constructor(props) {
        super(props);

        let token = false

        if(localStorage.getItem('jwtToken') !== "" && localStorage.getItem('jwtToken') !== null) {
            token = true
        }

        this.state = {
          isAuthenticated: token,
        }
    }

    onLogout() {
        this.props.logoutUser();
    }

    render() {
        const authNav = (
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to={"/personnage"}>
                        <NavItem eventKey={0}>Vote !</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/personnage"}>
                        <NavItem eventKey={1}>Classement</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <LinkContainer to={"/monCompte"}>
                        <NavItem eventKey={2}>Mon Compte</NavItem>
                    </LinkContainer>
                    <NavItem eventKey={3} onClick={this.onLogout.bind(this)}>Me déconnecter</NavItem>
                </Nav>
            </Navbar.Collapse>
        )
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <div className="navbar-brand">NHL vote app</div>
                    </Navbar.Brand>
                    <Navbar.Toggle id='collapseButton' />
                </Navbar.Header>
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
