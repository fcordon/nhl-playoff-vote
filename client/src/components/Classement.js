import React, { Component } from 'react'
import { Col, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { getAllClassement } from '../actions/ClassementAction'
import { getSeries, getAllUserSeries } from '../actions/SeriesAction'
import { updateClassement } from '../actions/ClassementAction'

class Classement extends Component {
  constructor(props) {
    super(props)

    this.props.getAllClassement()
    this.props.getSeries()
    this.props.getAllUserSeries()

    this.state = {
      keyState: 0,
      userPseudo: localStorage.getItem("userPseudo"),
      isAdmin: false,
      isLoading: false,
      usersID: [],
      usersPoints: [],
      series: []
    }
  }

  componentDidMount() {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.setState({keyState: this.state.keyState + 1})
      } else {
        alert( "This page is not reloaded");
      }
    }

    this.state.userPseudo === 'C Fab' && this.setState({ isAdmin: true })

    this.getUsersID().then(res => {
      res.map(users => {
        this.state.usersID.push(users.userID)
        this.state.usersPoints.push(users.points)
        return [this.state.usersID, this.state.usersPoints]
      })
      return res
    })

    this.getSeriesID().then(res => {
      res.map(serie => {
        this.state.series.push(serie._id)
        return this.state.series
      })
      return res
    })
  }

  getUsersID = async () => {
    const callApi = await axios.get('/classement')
    const response = await callApi.data

    return response
  }

  getSeriesID = async () => {
    const callApi = await axios.get('/series')
    const response = await callApi.data

    return response
  }

  getPoints() {
    this.props.allUserSeries.map((vote, i) => {
      let userIndex = this.state.usersID.indexOf(vote.userID)
      let userPoints = this.state.usersPoints[userIndex]
      let seriesIndex = this.state.series.indexOf(vote.seriesId)

      console.log('prev points : ', vote.userID + ' : ' + userPoints)

      // console.log('series : ', this.props.series[seriesIndex])
      // console.log('vote : ', vote)
      // console.log('series winner : ', this.props.series[seriesIndex].winner)
      // console.log('vote winner : ', vote.winner)

      if(this.props.series[seriesIndex].winner === vote.winner && this.props.series[seriesIndex].diff === vote.diff) {
        userPoints += 3
      } else if(this.props.series[seriesIndex].winner === vote.winner) {
        userPoints += 1
      }

      const newArray = this.state.usersPoints
      newArray[userIndex] = userPoints

      this.setState({
        usersPoints: newArray
      })

      console.log('next points : ', vote.userID + ' : ' + userPoints)


      return userPoints
    })

    this.state.usersID.map((user, i) => {
      this.props.updateClassement(user, {provisoire:this.state.usersPoints[i]})
      return this.state.usersPoints
    })
  }

  render() {
    return (
      <Col xs={12} md={{ span: 5, offset: 3 }} className='align-center' key={this.state.keyState}>
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
        {this.state.isAdmin && <Col xs={12} className="align-center"><Button onClick={this.getPoints.bind(this)}>Calculer les points</Button></Col>}
        {this.state.isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
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
