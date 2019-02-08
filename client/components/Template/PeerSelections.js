import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Button, Segment} from 'semantic-ui-react'
import {revealCompare, singleCompany} from '../../store/companyDetailsTable'
import Peer from '../Peer'

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   },
//   input: {
//     display: 'none'
//   }
// })

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
    const {classes} = this.props
    return (
      <div className="selector-child-container">
        <Peer />
      </div>
      // <div className="chartSelections">
      //   <Segment inverted id="chart-selections-buttons">
      //     <Button
      //       inverted
      //       color="purple"
      //       variant="contained"
      //       className={classes.button}
      //       onClick={this.toggleSingle}
      //     >
      //       Closing Prices
      //     </Button>

      //     <Button
      //       inverted
      //       color="purple"
      //       variant="contained"
      //       onClick={this.toggleCompare}
      //       className={classes.button}
      //     >
      //       Compare Two Equities
      //     </Button>
      //   </Segment>
      // </div>
    )
  }
}

// ChartSelections.propTypes = {
//   classes: PropTypes.object.isRequired
// }

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
