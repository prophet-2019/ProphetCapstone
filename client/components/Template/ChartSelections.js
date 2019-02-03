import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {revealCompare, singleCompany} from '../../store/companyDetailsTable'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

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
      <div className="chartSelections">
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.toggleSingle}
        >
          Closing Prices
        </Button>

        <Button
          variant="contained"
          onClick={this.toggleCompare}
          className={classes.button}
        >
          Compare Two Equities
        </Button>

        <Button
          variant="contained"
          color="secondary"
          disabled
          className={classes.button}
        >
          Disabled
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ChartSelections)
)
