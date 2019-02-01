import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
  }

  render() {
    const {classes} = this.props
    return (
      <div className="chartSelections">
        <Button variant="contained" href="/chart" className={classes.button}>
          Closing Prices
        </Button>

        <Button variant="contained" href="/compare" className={classes.button}>
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
export default withStyles(styles)(ChartSelections)
