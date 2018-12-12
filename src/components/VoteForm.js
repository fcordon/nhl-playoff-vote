import React, { Component } from 'react'
import { FormGroup, Checkbox, Col } from 'react-bootstrap'

export class VoteForm extends Component {
    render() {
        return (
            <Col xs={6} md={4} lg={3}>
                <FormGroup>
                    <img className='teams-logo' src={this.props.franchise.teamName !== 'Golden Knights' ? 'https://www.nhl.com/site-core/images/team/logo/current/' + this.props.id + '_dark.svg' : 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/54.svg'} alt={this.props.name} />
                    <label>{this.props.name}</label>
                    <Checkbox className='form-checkbox' id={this.props.id} title={this.props.name}></Checkbox>
                </FormGroup>
            </Col>
        )
    }
}
