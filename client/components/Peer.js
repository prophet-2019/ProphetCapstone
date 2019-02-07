import React, {Component} from 'react'
import {getPeers, getStockPrice} from '../store/chart'
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
  }
  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getPeers(this.props.ticker)
    }
  }
  handleSubmit = async val => {
    await this.props.getStockPrice(val, 'ytd')
  }

  render() {
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Peers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.peers.map(val => {
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
    peers: state.chart.peers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPeers: ticker => dispatch(getPeers(ticker)),
    getStockPrice: (ticker, time, ticker2) =>
      dispatch(getStockPrice(ticker, time, ticker2))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Peer))
