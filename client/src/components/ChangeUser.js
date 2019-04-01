import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Card, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { findDOMNode } from 'react-dom'

import { updateUser, logoutUser } from '../actions/Authentication'

class ChangeUser extends Component {

  constructor(props) {
    super(props);

    let userID = this.props.id

    this.state = {
      userID: userID,
      modifyUser: false
    }
  }

  modifyUser() {
    this.setState({modifyUser: !this.state.modifyUser})
  }

  changeUser() {
    let newUserInfos = {
      nom: findDOMNode(this.refs.newNom).value,
      prenom: findDOMNode(this.refs.newPrenom).value,
      pseudo: findDOMNode(this.refs.newPseudo).value,
      email: findDOMNode(this.refs.newEmail).value
    }
    this.props.updateUser(this.state.userID, newUserInfos)
    this.props.logoutUser()
  }

  render() {
    return (
      <Col xs={12} md={{ span: 4, offset: 4 }}>
        <Card>
          <Card.Header>
            <Card.Title>Modifie tes informations de compte</Card.Title>
          </Card.Header>
          <Card.Body>
            {this.state.modifyUser ?
              <ul>
                <li>
                  <FormGroup controlId="newNom">
                    <InputGroup>Change ton Nom :</InputGroup>
                    <FormControl
                      type='text'
                      defaultValue={this.props.nom}
                      ref='newNom' />
                  </FormGroup>
                </li>
                <li>
                  <FormGroup controlId="newPrenom">
                    <InputGroup>Change ton Prénom :</InputGroup>
                    <FormControl
                      type='text'
                      defaultValue={this.props.prenom}
                      ref='newPrenom' />
                  </FormGroup>
                </li>
                <li>
                  <FormGroup controlId="newPseudo">
                    <InputGroup>Change ton pseudo :</InputGroup>
                    <FormControl
                      type='text'
                      defaultValue={this.props.pseudo}
                      ref='newPseudo' />
                  </FormGroup>
                </li>
                <li>
                  <FormGroup controlId="newEmail">
                    <InputGroup>Change ton email :</InputGroup>
                    <FormControl
                      type='text'
                      defaultValue={this.props.email}
                      ref='newEmail' />
                  </FormGroup>
                </li>
                <li>
                  <Button onClick={this.changeUser.bind(this)}>Sauvegarder</Button>
                  <Button onClick={this.modifyUser.bind(this)}>Annuler</Button>
                </li>
                <li><p>Attention tu seras déconnecté automatiquement afin de faire la mise à jour. Il faudra te connecter à nouveau.</p></li>
              </ul> :
              <ul>
                <li>Nom : {this.props.nom}</li>
                <li>Prénom : {this.props.prenom}</li>
                <li>Pseudo : {this.props.pseudo}</li>
                <li>Email : {this.props.email}</li>
                <li><Button onClick={this.modifyUser.bind(this)}>Modifier</Button></li>
              </ul>
            }
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser, logoutUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChangeUser);
