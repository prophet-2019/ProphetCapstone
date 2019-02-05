import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Segment} from 'semantic-ui-react'
import HeadlineComponent from './HeadlineComponent'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Header = ({handleClick}) => (
  <div className="header-container">
    <div className="header-Logo">
      <img
        src="https://ih1.redbubble.net/image.697159210.3375/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg"
        as="prophet-logo"
        height="50"
        width="50"
      />
    </div>
    <Segment inverted id="header-logout">
      <Button
        inverted
        // id="logout-button"
        href="/"
        color="purple"
        type="submit"
        value="Logout"
        onClick={handleClick}
      >
        Logout
      </Button>
    </Segment>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Header)

/**
 * PROP TYPES
 */
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
