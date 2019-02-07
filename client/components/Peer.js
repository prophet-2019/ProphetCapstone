import React, {Component} from 'react'
import {getPeers} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

class Peer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: [],
      intervalId: 0,
      currentUser: 0
    }
  }
  componentDidMount() {
    this.props.getPeers(this.props.ticker)
  }
  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getPeers(this.props.ticker)
    }
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
                <Table.Cell>{val}</Table.Cell>
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
    getPeers: ticker => dispatch(getPeers(ticker))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Peer))
