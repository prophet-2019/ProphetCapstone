import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  Button,
  Segment,
  Modal,
  Transition,
  TransitionablePortal
} from 'semantic-ui-react'
import {getStockPrice} from '../../store/chart'
import {getComparedStockPrice} from '../../store/compareChart'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitEquity: '',
      submitEquity2: '',
      timeFrame: '3m',
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({
      submitEquity: evt.target.value
    })
  }
  handleChange2(evt) {
    evt.preventDefault()
    this.setState({
      submitEquity2: evt.target.value
    })
  }

  handleSubmit = async () => {
    await this.props.getStockPrice(this.state.submitEquity, 'ytd')
    await this.setState({
      submitEquity: ''
    })
  }

  handleSubmit2 = async () => {
    await this.props.getCompanyStockPrices(
      this.state.submitEquity,
      this.state.submitEquity2,
      this.state.timeFrame
    )
    await this.setState({
      submitEquity: '',
      submitEquity2: ''
    })
  }

  show = size => () => this.setState({size, open: true})

  close = () => this.setState({open: false})

  render() {
    const {open, size} = this.state

    return (
      <div className="search">
        <Button
          id="help-btn"
          onClick={this.show('tiny')}
          icon="question circle outline icon"
        />
        <div>
          <Transition.Group
            open={open}
            transition="horizontal-flip"
            duration={1000}
          >
            {open && (
              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>What is an equity?</Modal.Header>
                <Modal.Content>
                  <p>
                    Definition: the value of the shares issued by a company.
                  </p>
                  <p>
                    Enter a unique stock ticker (ie, Apple [AAPL], Alphabet
                    [GOOG], Tesla [TSLA])
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    onClick={this.close}
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="Got it!"
                  />
                </Modal.Actions>
              </Modal>
            )}
          </Transition.Group>
        </div>
        {this.props.compare ? (
          <div>
            <label>
              Pick an equity:
              <input
                type="text"
                value={this.state.submitEquity}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Pick another equity:
              <input
                type="text"
                value={this.state.submitEquity2}
                onChange={this.handleChange2}
              />
            </label>
            <Segment inverted id="search-button">
              <Button
                inverted
                color="purple"
                type="submit"
                value="Submit"
                onClick={this.handleSubmit2}
              >
                Submit
              </Button>
            </Segment>
          </div>
        ) : (
          <div>
            <label>
              Pick an equity:
              <input
                type="text"
                value={this.state.submitEquity}
                onChange={this.handleChange}
              />
            </label>
            <Segment inverted id="search-button">
              <Button
                inverted
                color="purple"
                type="submit"
                value="Submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Segment>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    ticker: state.chart.ticker,
    compare: state.companyDetailsTable.compare,
    ticker2: state.chart.ticker2
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: (ticker, time, ticker2) =>
      dispatch(getStockPrice(ticker, time, ticker2)),
    getCompanyStockPrices: (ticker1, ticker2, time) =>
      dispatch(getComparedStockPrice(ticker1, ticker2, time))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
