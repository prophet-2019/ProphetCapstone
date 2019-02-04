import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HeadlineComponent from './HeadlineComponent'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Header = ({handleClick, isLoggedIn}) => (
  <div className="header-isLoggedIn-container">
    {/* <nav> */}
    {/* {isLoggedIn ? (
        <div className="isLoggedIn-container">
          {/* The header will show these links after you log in */}
    {/* <div className="header-Logo">
            <img
              src="https://ih1.redbubble.net/image.697159210.3375/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg"
              as="prophet-logo"
              height="50"
              width="50"
            />
          </div>

          <HeadlineComponent />

          <div className="header-logout">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>

          <div className="header-profile">
            <h5>Profile</h5>
          </div>
        </div>
      ) : (
        <div className="isLoggedOut">
          {/* The header will show these links before you log in */}
    {/* <Link to="/signup">Sign Up</Link> */}
    {/* <Link to="/login">Login</Link> */}
    {/* </div> */}
    {/* )}  */}
    {/* </nav>  */}
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
