import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col } from 'react-bootstrap';

import { getUser } from '../actions/Authentication';
import { getVote } from '../actions/VoteAction';

import ChangeUser from '../components/ChangeUser';
import UserVote from '../components/UserVote';

export class MonCompte extends Component {

    constructor(props) {
        super(props);
        let userPseudo = localStorage.getItem("userPseudo");
        let userID = localStorage.getItem("userID");

        this.state = {
            userPseudo: userPseudo,
            userID: userID,
            modifyName: false
        }
    }

    componentDidMount() {
        const userID = { id: this.state.userID }
        this.props.getUser(userID)
        this.props.getVote(this.state.userID)
    }

    render() {
        return (
            <Grid id="mon-compte" className="vertical-middle" fluid>
                <Col xs={12}>
                    <h1 className="align-center">Voici ton compte {this.state.userPseudo}</h1>
                    {this.props.userData.map((user, i) => <ChangeUser key={i} {...user} />)}
                </Col>
                <Col xs={12}>
                    {this.props.userVote.map((vote, i) => <UserVote key={i} {...vote} />)}
                </Col>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.auth.user,
        userVote: state.vote.userVote
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser,
        getVote
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonCompte);
