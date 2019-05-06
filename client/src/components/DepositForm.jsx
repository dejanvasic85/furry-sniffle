import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TextField,
  withStyles
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import { CardElement, injectStripe } from 'react-stripe-elements';

import withApiClient from '../decorators/withApiClient';
import Button from './Button';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  paymentElement: {
    maxWidth: '450px'
  },
  cardElement: {
    marginTop: '10px',
    border: '1px solid #eee',
    padding: '15px'
  }
});

const AUD_BASE_VALUE = 100;

class DepositForm extends Component {
  state = {
    amount: 50,
    isFetching: false,
    depositComplete: false,
    paymentFormReady: false
  };

  submit = async () => {
    this.setState({ isFetching: true });
    const amount = this.state.amount * AUD_BASE_VALUE;
    const { agent, api, stripe } = this.props;
    const { token } = await stripe.createToken({ name: agent.email });
    const { status } = await api.completeDeposit({ amount, stripeToken: token.id });

    if (status === "succeeded") {
      console.log("Deposit Complete!");
      this.setState({ isFetching: false, depositComplete: true });
    }
  }

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  }

  handlePaymentChange = event => {
    this.setState({ paymentFormReady: event.complete });
  }

  render() {
    const { accountBalance, classes } = this.props;
    const { amount, isFetching, paymentFormReady } = this.state;
    const canSubmit = amount > 0 && paymentFormReady;

    return (
      <Card>
        <CardHeader
          title="Balance"
          subheader={<CurrencyFormat value={accountBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />} />
        <Divider />
        <CardContent>
          {
            accountBalance === 0 && <Typography>In order to gift your client you must deposit money first.</Typography>
          }
          <div className={classes.paymentElement}>
            <TextField
              id="filled-number"
              label="Amount"
              value={amount}
              onChange={this.handleAmountChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <div className={classes.cardElement}>
              <CardElement 
                hidePostalCode={true} 
                style={{base: {fontSize: '18px'}}}
                onChange={this.handlePaymentChange}/>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSubmit}
            onClick={this.submit}
            isFetching={isFetching}>Deposit</Button>
        </CardActions>
      </Card>
    );
  }
}

DepositForm.propTypes = {
  accountBalance: PropTypes.number.isRequired,
  agent: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles),
  injectStripe,
  withApiClient
)(DepositForm);