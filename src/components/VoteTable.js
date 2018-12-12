import React, { Component } from 'react'
import { FormGroup, Checkbox, Col } from 'react-bootstrap'

export class VoteTable extends Component {

    render() {
        return (
            <Col xs={6} lg={3}>
                <FormGroup>
                    <Checkbox inline>{this.props.name}</Checkbox>
                </FormGroup>
            </Col>
        )
    }
}
