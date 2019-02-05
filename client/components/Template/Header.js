import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Segment} from 'semantic-ui-react'
// import ProphetLogo from
import HeadlineComponent from './HeadlineComponent'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Header = ({handleClick}) => (
  <div className="header-container">
    <div className="header-Logo">
      <img src="/Prophet_Logo.png" as="prophet-logo" height="50" width="50" />
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
