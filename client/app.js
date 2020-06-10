import React, {Component} from 'react'
import Routes from './routes'
import {getPriceFromAPI} from './store/ticker'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Particles from 'react-particles-js'

class App extends Component {
  componentDidMount() {
    this.props.getPriceFromAPI()
  }
  render() {
    return (
      <div className="wrapper">
        <Particles
          className="particles-js"
          width="100%"
          height="100%"
          params={{
            particles: {
              number: {
                value: 275,
                density: {
                  enable: true
                }
              },
              color: {
                value: '#9370DB'
              },
              size: {
                value: 2,
                random: true
              },
              shape: {
                type: 'cirlce',
                stroke: {
                  width: 1
                }
              },
              opacity: {
                value: 70
              },
              move: {
                direction: 'top',
                out_mode: 'out',
                speed: 1
              },
              line_linked: {
                enable: true,
                color: '#e03997'
              }
            }
          }}
        />
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
