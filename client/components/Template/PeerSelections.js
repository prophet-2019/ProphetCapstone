import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {revealCompare, singleCompany} from '../../store/companyDetailsTable'
import Peer from '../Peer'

class ChartSelections extends Component {
  constructor(props) {
    super(props)
    this.toggleCompare = this.toggleCompare.bind(this)
    this.toggleSingle = this.toggleSingle.bind(this)
  }

  toggleCompare() {
    this.props.enableCompare()
  }
  toggleSingle() {
    this.props.disableCompare()
  }

  render() {
    return (
      <div className="selector-child-container">
        <Peer />
      </div>
    )
  }
}

ChartSelections.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    compare: state.companyDetailsTable.compare
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enableCompare: () => dispatch(revealCompare()),
    disableCompare: () => dispatch(singleCompany())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSelections)
