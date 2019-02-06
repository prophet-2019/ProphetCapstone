import React from 'react'
import {Button, Header, Icon, Modal} from 'semantic-ui-react'

const ModalTutorial = () => (
  <Modal
    trigger={
      <Button id="modal-btn" align="center">
        Get Started Here!
      </Button>
    }
    basic
    size="large"
    dimmer="blurring"
  >
    <Header icon="" content="This is your Prophet dashboard!" />

    <Modal.Content>
      <p className="ui Modal tutorial mission">
        <b>Our mission is to assist first time investors manage a portfolio.</b>
      </p>
      <p>
        Your portfolio is on the left of the dashboard. We've already started
        you with $100,000 (don't worry - it's not REAL money.)
      </p>

      <p>
        The financial information on your dashboard is pre-populated with our
        favorite real estate company.
      </p>
      <p>
        On the right of the dashboard, enter in the search bar the stock ticker
        of any company of your choice. Don't know any company stock tickers? Try
        some of our favorites: GOOG (Google), TSLA (Tesla), AMZN (Amazon), WMT
        (Walmart), CMG (Chipotle), DIS (Disney).
      </p>

      <p>
        Based on the real-time financial information that loads, decide whether
        to buy or sell stock of your selected company.
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button icon="close" floated="left" circular={true} inverted />
    </Modal.Actions>
  </Modal>
)

export default ModalTutorial