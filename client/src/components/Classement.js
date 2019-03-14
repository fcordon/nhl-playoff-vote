import React, { Component } from 'react'
import { Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllClassement } from '../actions/ClassementAction'

class Classement extends Component {
  constructor(props) {
    super(props)

    this.props.getAllClassement()
  }

  render() {
    return (
      <Col xs={12} md={4} mdOffset={4} className='align-center'>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className='align-center'>Classement</th>
              <th className='align-center'>Pseudo</th>
              <th className='align-center'>Points</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allClassement.map((stand, i) => <tr key={i}><td>{i + 1}</td><td>{stand.userPseudo}</td><td>{stand.points}</td></tr>)}
          </tbody>
        </Table>
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    allClassement: state.classement.allClassement
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllClassement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Classement);
