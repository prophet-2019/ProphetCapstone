import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import PortfolioList from './PortfolioList'
import AssetAllocation from '../AssetAllocation'
import {getPortfolio} from '../../store/assetallocation'

class UserPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: []
    }
  }

  componentDidMount() {
    this.setState({
      portfolio: this.props.portfolio
    })
  }

  render() {
    return (
      <div className="portfolio-container">
        <PortfolioList />
        <AssetAllocation portfolioData={this.state.portfolio} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.assetallocation.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPortfolio)
)
