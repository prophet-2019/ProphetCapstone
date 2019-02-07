import React, {Component} from 'react'
import {getPortfolio} from '../store/assetallocation'
import {getStockPriceForAssetAllocation} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {RadialChart} from 'react-vis'
import {
  Button,
  Modal,
  Transition,
  TransitionablePortal
} from 'semantic-ui-react'

const myPalette = [
  '#cc00ff',
  '#330099',
  '#cc66cc',
  '#663399',
  '#ff99ff',
  '#660099',
  '#330066',
  '#990061',
  '72054a',
  '782258',
  '78222b',
  'ae1865'
]

class AssetAllocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: [],
      intervalId: 0,
      currentUser: 0,
      open: false
    }
    this.intervalFunc = this.intervalFunc.bind(this)
  }

  async intervalFunc() {
    const callBack = (func, userId) => {
      func(userId)
    }
    this.props.getPortfolio(this.state.currentUser)
    const intervalId = setInterval(() => {
      callBack(this.props.getPortfolio, this.props.userId)
    }, 50000)
    await this.setState({intervalId})
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  async componentDidMount() {
    this.setState({
      portfolio: this.props.portfolio,
      currentUser: this.props.userId
    })
    await this.intervalFunc()
  }

  show = size => () => this.setState({size, open: true})

  close = () => this.setState({open: false})

  render() {
    let myData
    if (this.props.portfolio.length) {
      myData = this.props.portfolio.reduce((accum, val) => {
        accum.push({angle: val[1]})
        return accum
      }, [])
    } else {
      myData = [{angle: 0}, {angle: 0}, {angle: 100}]
    }

    const {open, size} = this.state

    return (
      <div>
        <h4>
          Portfolio Allocation{' '}
          <Button
            onClick={this.show('tiny')}
            id="help-btn"
            icon="question circle outline icon"
          />{' '}
        </h4>
        <div>
          <Transition.Group
            open={open}
            transition="horizontal-flip"
            duration={1000}
          >
            {open && (
              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>
                  This section contains a graphical division of your portfolio
                </Modal.Header>
                <Modal.Content>
                  <p>
                    This pie chart graph will automatically calculate and
                    display how your initial cash was divided between your
                    bought stocks.
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
        <RadialChart
          animation
          colorType="category"
          colorDomain={[0, 1, 2, 3, 4, 5, 6]}
          colorRange={myPalette}
          className="templateAssetAllocation"
          data={myData}
          width={300}
          height={300}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.assetallocation.portfolio,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getStockPriceForAssetAllocation: ticker =>
      dispatch(getStockPriceForAssetAllocation(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssetAllocation)
)
