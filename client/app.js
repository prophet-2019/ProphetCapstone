import React, {Component} from 'react'
import Routes from './routes'
import {getPriceFromAPI} from './store/ticker'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class App extends Component {
  componentDidMount() {
    this.props.getPriceFromAPI()
  }
  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPriceFromAPI: () => dispatch(getPriceFromAPI())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
