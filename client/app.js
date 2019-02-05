import React, {Component} from 'react'
import Routes from './routes'
import {getPriceFromAPI} from './store/ticker'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import particle from './particle'
import 'particles.js/particles'
import Particles from 'react-particles-js'

const particlesJS = window.particlesJS
class App extends Component {
  componentDidMount() {
    this.props.getPriceFromAPI()
  }
  render() {
    return (
      <div>
        <Particles className="particles-js" params={particle} />
        {particlesJS.load(
          'particles-js',
          '../public/particles.json',
          function() {
            console.log('loaded')
          }
        )}
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
