import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  colors,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TextField,
  withStyles,
} from '@material-ui/core';
import { CreditCard, AccountBalance } from '@material-ui/icons';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { withApiClient, withConfig } from '../decorators';
import { Alert, Button, Currency } from '../components/index';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  cardElement: {
    marginTop: '10px',
    border: `1px solid ${colors.blueGrey[400]}`,
    padding: '15px',
  },
  alert: {
    width: '100%',
    padding: '20px',
  },
  depositChoices: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '18px',
  },
  depositChoice: {
    cursor: 'pointer',
    border: `1px solid ${colors.blueGrey[400]}`,
    flexGrow: '1',
    textAlign: 'center',
    padding: '18px',
    borderRadius: '8px',
    margin: '0 10px',
  },
  selected: {
    backgroundColor: colors.blueGrey[100],
  },
  icon: {
    fontSize: '60px',
  },
  paymentInput: {
    padding: '18px',
    minHeight: '200px',
  },
});

const AUD_BASE_VALUE = 100;
const PAYMENT_CREDIT_CARD = 'credit card';
const PAYMENT_DIRECT_DEBIT = 'direct debit';

class DepositForm extends Component {
  state = {
    amount: 50,
    isFetching: false,
    depositComplete: false,
    paymentFormReady: false,
    selectedPaymentType: PAYMENT_CREDIT_CARD,
  };

  submit = async () => {
    this.setState({ isFetching: true });
    const baseAmount = this.state.amount * AUD_BASE_VALUE;
    const { agent, api, stripe } = this.props;
    const { token } = await stripe.createToken({ name: agent.email });
    const { status } = await api.completeDeposit({
      amount: baseAmount,
      stripeToken: token.id,
    });

    if (status === 'succeeded') {
      console.log('Deposit Complete!');
      this.setState({ isFetching: false, depositComplete: true });
    }
  };

  handlePaymentTypeChange = selectedPaymentType => {
    this.setState({ selectedPaymentType });
  };

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handlePaymentChange = event => {
    this.setState({ paymentFormReady: event.complete });
  };

  calculateTotalDepositAmount = ({ amount, depositFeeCents, depositFeePercent }) => {
    let totalAmount = 0;
    if (amount > 0) {
      const baseAmount = amount * AUD_BASE_VALUE;
      totalAmount = baseAmount + baseAmount * (depositFeePercent / 100);
    }

    return totalAmount;
  };

  render() {
    const {
      accountBalance,
      classes,
      config: { feeConfiguration },
    } = this.props;

    const { amount, depositComplete, isFetching, paymentFormReady, selectedPaymentType } = this.state;

    const canSubmit = amount > 0 && paymentFormReady;
    const isCreditSelected = selectedPaymentType === PAYMENT_CREDIT_CARD;
    const isDirectDebitSelected = selectedPaymentType === PAYMENT_DIRECT_DEBIT;

    return (
      <Card>
        <CardHeader title="Balance" subheader={<Currency baseAmount={accountBalance} />} />
        <Divider />
        <CardContent>
          <Typography variant="h5">Deposit</Typography>
          <Typography variant="body1">
            In order to gift your client you must deposit money first. Allow up to 2 working days for the deposit to
            reach our bank account.
          </Typography>
          <div className={classes.depositChoices}>
            <div
              className={classNames(classes.depositChoice, { [classes.selected]: isCreditSelected })}
              onClick={() => this.handlePaymentTypeChange(PAYMENT_CREDIT_CARD)}
            >
              <Typography variant="h6">Credit Card</Typography>
              <CreditCard className={classes.icon} />
            </div>
            <div
              className={classNames(classes.depositChoice, { [classes.selected]: isDirectDebitSelected })}
              onClick={() => this.handlePaymentTypeChange(PAYMENT_DIRECT_DEBIT)}
            >
              <Typography variant="h6">Direct Debit</Typography>
              <AccountBalance className={classes.icon} />
            </div>
          </div>

          <div className={classes.paymentInput}>
            {isCreditSelected && (
              <Fragment>
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
                  <div>
                    <Typography>
                      {' '}
                      + Processing fee = {feeConfiguration.depositFeePercent}% + {feeConfiguration.depositFeeCents}{' '}
                      cents
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      = <Currency baseAmount={this.calculateTotalDepositAmount({ amount, ...feeConfiguration })} />
                    </Typography>
                  </div>
                  <div className={classes.cardElement}>
                    <CardElement
                      hidePostalCode={true}
                      style={{ base: { fontSize: '18px' } }}
                      onChange={this.handlePaymentChange}
                    />
                  </div>
                </div>
              </Fragment>
            )}

            {isDirectDebitSelected && (
              <Fragment>
                <Typography>Direct debit details go here</Typography>
              </Fragment>
            )}
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSubmit}
            onClick={this.submit}
            isFetching={isFetching}
          >
            Deposit
          </Button>
        </CardActions>
        {depositComplete && (
          <div className={classes.alert}>
            <Alert
              message="Success. Please allow up to 2 working days for settlement."
              variant="success"
              onClose={this.handleAlertClose}
            />
          </div>
        )}
      </Card>
    );
  }
}

DepositForm.propTypes = {
  accountBalance: PropTypes.number.isRequired,
  agent: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  injectStripe,
  withApiClient,
  withConfig
)(DepositForm);
