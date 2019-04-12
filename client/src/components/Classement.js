import React, { Component } from 'react'
import { Col, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllClassement } from '../actions/ClassementAction'
import { getSeries, getAllUserSeries } from '../actions/SeriesAction'
import { updateClassement } from '../actions/ClassementAction'

class Classement extends Component {
  constructor(props) {
    super(props)
    let userPseudo = localStorage.getItem("userPseudo")

    this.props.getAllClassement()
    this.props.getSeries()
    this.props.getAllUserSeries()

    this.state = {
      userPseudo: userPseudo,
      isAdmin: false,
      usersID: [],
      usersPoints: [],
      series: []
    }
  }

  componentDidMount() {
    this.state.userPseudo === 'C Fab' && this.setState({ isAdmin: true })
  }

  getPoints() {
    this.props.allClassement.map((classement, i) => {
      this.state.usersID.push(classement.userID)
      this.state.usersPoints.push(classement.points)
      return [this.state.usersID, this.state.usersPoints]
    })

    this.props.series.map((serie, i) => {
      this.state.series.push(serie._id)
      return this.state.series
    })

    this.props.allUserSeries.map((vote, i) => {
      let userIndex = this.state.usersID.indexOf(vote.userID)
      let userPoints = this.state.usersPoints[userIndex]
      let seriesIndex = this.state.series.indexOf(vote.seriesId)

      if(this.props.series[seriesIndex].winner === vote.winner && this.props.series[seriesIndex].diff === vote.diff) {
        const newArray = this.state.usersPoints
        const newItem = userPoints + 3
        newArray[userIndex] = newItem

        this.setState({
          usersPoints: newArray
        })
      } else if(this.props.series[seriesIndex].winner === vote.winner) {
        const newArray = this.state.usersPoints
        const newItem = userPoints + 1
        newArray[userIndex] = newItem

        this.setState({
          usersPoints: newArray
        })
      }

      console.log('userPoints : ', userPoints)
      this.props.updateClassement(vote.userID, {provisoire:userPoints})
      return userPoints
    })
  }

  render() {
    return (
      <Col xs={12} md={{ span: 5, offset: 3 }} className='align-center'>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className='align-center'>Classement</th>
              <th className='align-center'>Pseudo</th>
              <th className='align-center'>Points</th>
              <th className='align-center'>Points provisoire</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allClassement.map((stand, i) => <tr key={i}><td>{i + 1}</td><td>{stand.userPseudo}</td><td>{stand.points}</td><td>{stand.provisoire}</td></tr>)}
          </tbody>
        </Table>
        {this.state.isAdmin ? <Col xs={12} className="align-center"><Button onClick={this.getPoints.bind(this)}>Calculer les points</Button></Col> : null}
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    allClassement: state.classement.allClassement,
    series: state.series.series,
    allUserSeries: state.series.allUserSeries
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllClassement,
    getSeries, getAllUserSeries,
    updateClassement
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Classement);
