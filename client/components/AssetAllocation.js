import React, {Component} from 'react'
import {getPortfolio} from '../store/assetallocation'
import {getStockPriceForAssetAllocation} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {RadialChart} from 'react-vis'

class AssetAllocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: [],
      intervalId: 0,
      currentUser: 0
    }
    this.intervalFunc = this.intervalFunc.bind(this)
  }

  async intervalFunc() {
    const callBack = (func, userId) => {
      func(userId)
    }
    this.props.getPortfolio(this.state.currentUser)
    const intervalId = setInterval(() => {
      callBack(this.props.getPortfolio, this.props.userId)
    }, 5000)
    await this.setState({intervalId})
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  async componentDidMount() {
    this.setState({
      portfolio: this.props.portfolio,
      currentUser: this.props.userId
    })
    await this.intervalFunc()
  }

  render() {
    let myData
    if (this.props.portfolio.length) {
      myData = this.props.portfolio.reduce((accum, val) => {
        accum.push({angle: val[1]})
        return accum
      }, [])
    } else {
      myData = [{angle: 0}, {angle: 0}, {angle: 100}]
    }
    return (
      <div>
        <h4>Portfolio Allocation</h4>
        <RadialChart
          animation
          colorType="literal"
          className="templateAssetAllocation"
          data={myData}
          width={300}
          height={300}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.assetallocation.portfolio,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getStockPriceForAssetAllocation: ticker =>
      dispatch(getStockPriceForAssetAllocation(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssetAllocation)
)
