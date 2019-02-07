import React, {Component} from 'react'
import {getPeers, getStockPrice, getInFocus} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Button, Table} from 'semantic-ui-react'

class Peer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getPeers(this.props.ticker)
    this.props.getInFocus()
  }
  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getPeers(this.props.ticker)
      this.props.getInFocus()
    }
  }
  handleSubmit = async val => {
    await this.props.getStockPrice(val, 'ytd')
  }

  render() {
    const {peers} = this.props
    const slicedSixFromPeers = peers.slice(0, 6)
    const {inFocusStocks} = this.props
    const slicedSixFromFocus = inFocusStocks
      .slice(0, 6)
      .reduce((accum, val) => {
        accum.push(val.symbol)
        return accum
      }, [])
    let arrToRender
    let name
    if (slicedSixFromPeers.length < 6) {
      console.log('LENGTH', slicedSixFromPeers, slicedSixFromFocus)
      arrToRender = slicedSixFromFocus
      name = 'Stocks in Focus'
    } else {
      arrToRender = slicedSixFromPeers
      name = 'Peer Companies'
    }
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{name}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {arrToRender.map(val => {
            return (
              <Table.Row key={val}>
                <Table.Cell>
                  <Button onClick={() => this.handleSubmit(val)}>{val}</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    ticker: state.chart.ticker,
    peers: state.chart.peers,
    inFocusStocks: state.chart.inFocusStocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPeers: ticker => dispatch(getPeers(ticker)),
    getStockPrice: (ticker, time, ticker2) =>
      dispatch(getStockPrice(ticker, time, ticker2)),
    getInFocus: () => dispatch(getInFocus())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Peer))
