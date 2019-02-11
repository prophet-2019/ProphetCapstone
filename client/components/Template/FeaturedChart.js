import React, {Component} from 'react'
import HomePageChart from '../HomePageChart'

export default class FeaturedChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-feature">
        <HomePageChart />
      </div>
    )
  }
}
