import React, { Component } from 'react'
import { Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllClassement } from '../actions/ClassementAction'
import { ClassementTable } from '../components/ClassementTable'

class Classement extends Component {

  componentDidMount() {
    this.props.getAllClassement()
  }

  render() {
    return (
      <Col xs={12} className='user-vote'>
        <Table>
          <thead>
            <tr>
              <th>Classement</th>
              <th>Pseudo</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allClassement.map((stand, i) => <ClassementTable key={i} {...stand} />)}
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
