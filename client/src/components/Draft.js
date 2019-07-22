import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import axios from 'axios'

class Calendrier extends Component {
  constructor(props) {
    super(props)

    this.state = {
      draft: []
    }
  }

  componentDidMount() {
    this.getDraft()
    .then(res => this.setState({ draft: res.dates }))
    .catch(err => console.log(err))
  }

  getDraft = async (startDate, endDate) => {
    let date = new Date()
    let year = date.getFullYear()
    const callApi = await axios.get('https://statsapi.web.nhl.com/api/v1/draft/' + year)
    const response = await callApi.data

    console.log('draft : ', response)

    return response
  }

  render() {
    return (
      <Col xs={12} className='calendar align-center'>
        Draft
      </Col>
    )
  }
}

export default Calendrier;
