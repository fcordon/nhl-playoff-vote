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
    let userID = localStorage.getItem("userID")

    this.props.getAllClassement()
    this.props.getSeries()
    this.props.getAllUserSeries()

    this.state = {
      userPseudo: userPseudo,
      userID: userID,
      isAdmin: false
    }
  }

  componentDidMount() {
    this.state.userPseudo === 'C Fab' && this.setState({ isAdmin: true })
  }

  getPoints() {
    this.props.allClassement.map((user, i) => {
      let userID = user.userID
      let userPoints = user.points

      this.props.allUserSeries.map((vote, i) => {
        let seriesID = vote.seriesId
        let seriesWinner = vote.winner
        let seriesDiff = vote.diff

        if(vote.userID === userID) {
          this.props.series.map((serie, i) => {
            if(serie._id === seriesID) {
              if(seriesWinner === serie.winner && seriesDiff === serie.diff) {
                userPoints = userPoints + 3
              } else if(seriesWinner === serie.winner) {
                userPoints = userPoints + 1
              }
            }
            return userPoints
          })
          // Update Classement Points here !!!!
        }
        return seriesID
      })
      return userPoints
    })
  }

  render() {
    return (
      <Col xs={12} md={{ span: 4, offset: 4 }} className='align-center'>
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
