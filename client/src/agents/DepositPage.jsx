import React, { useState, useEffect, Fragment } from 'react';
import { compose } from 'recompose';
import { CardElement, injectStripe } from 'react-stripe-elements';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  TextField,
  withStyles,
  colors
} from '@material-ui/core';

import { withApiClient, withConfig, withAuth } from '../decorators';
import { Alert, Button, Currency, Loader } from '../components';
import { toBaseValue } from '../services/feeService';

const styles = theme => ({

  padded: {
    padding: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  disclaimer: {
    color: colors.grey[600],
    marginRight: '10px'
  },
  cardElement: {
    marginTop: '16px',
    borderBottom: `1px solid ${colors.grey[600]}`,
    padding: '12px'
  },
  feeSummary: {
    marginTop: '16px',
    fontSize: '16px'
  }
});

const DepositPage = ({ api, classes, config, stripe, auth }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaymentFormReady, setIsPaymentFormReady] = useState(false);
  const [paymentError, setPaymentError] = useState({ isDisplayed: false, isDismissed: false });
  const [amount, setAmount] = useState(50);
  const [account, setAccount] = useState({
    balance: 0,
    availableFunds: 0
  });

  const { feeConfiguration } = config;

  useEffect(() => {
    const fetchAccount = async () => {
      const { account: accountFromApi } = await api.getAccount();
      if (accountFromApi) {
        setAccount(accountFromApi);
      }

      setIsFetching(false);
    };

    if (isFetching) {
      fetchAccount();
    }
  }, [api, isFetching]);

  const startDeposit = async () => {
    setIsDepositing(true);
    const profile = auth.getProfile();
    const response = await stripe.createToken({ name: profile.email });
    const baseAmount = toBaseValue(amount);
    
    try {
      const { status, account: updatedAccount } = await api.completeDeposit({
        amount: baseAmount,
        stripeToken: response.token.id
      });

      if (status === 'succeeded') {
        setIsComplete(true);
        setAccount(updatedAccount);
      }
    } catch(err) {
      setIsDepositing(false);
      setPaymentError({ isDisplayed: true });
    }
  };

  const handlePaymentChange = event => {
    setIsPaymentFormReady(event.complete);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const calculateTotal = () => {
    let totalAmount = 0;
    if (amount > 0) {
      const baseAmount = amount * 100;
      totalAmount =
        baseAmount +
        baseAmount * (feeConfiguration.depositFeePercent / 100) +
        feeConfiguration.depositFeeCents;
    }

    return totalAmount;
  };

  const isValid = () => {
    return amount > 0 && amount <= 1000;
  };

  const dismissError = () => {
    setPaymentError({
      ...paymentError,
      isDismissed: true
    });
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
 
      <Card className={classes.padded}>
        <CardHeader
          title="Deposit"
          subheader={
            <Fragment>
              Balance{' '}
              <strong>
                <Currency baseAmount={Number(account.balance)} />
              </strong>{' '}
              Available Funds{' '}
              <strong>
                <Currency baseAmount={Number(account.availableFunds)} />
              </strong>{' '}
            </Fragment>
          }
        />
        <Divider />
        <CardContent>
          {isComplete && <Alert message="Deposit successful!" variant="success" />}
          {!isComplete && (
            <React.Fragment>
              <TextField
                id="filled-number"
                label="Amount"
                value={amount}
                onChange={handleAmountChange}
                type="number"
                fullWidth
                helperText="Max deposit amount is $1,000"
                error={!isValid()}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />

              <div className={classes.cardElement}>
                <CardElement
                  hidePostalCode={true}
                  style={{ base: { fontSize: '16px' } }}
                  onChange={handlePaymentChange}
                />
              </div>

              <Typography className={classes.feeSummary}>
                Total: <Currency baseAmount={calculateTotal()} />
                &nbsp;(incl {feeConfiguration.depositFeePercent}% +{' '}
                {feeConfiguration.depositFeeCents} cents fee)
              </Typography>
            </React.Fragment>
          )}
        </CardContent>
        {!isComplete && (
          <React.Fragment>
            {
              paymentError.isDisplayed && !paymentError.isDismissed && (
                <React.Fragment>
                  <Alert message="Payment failed. Please check your card and try again!" variant="error"  onClose={dismissError} />
                </React.Fragment>
              )
            }
            <Divider />
            <CardActions className={classes.buttons}>
              <Typography className={classes.disclaimer}>
                Please allow up to 2 working days for funds to be available
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={!isPaymentFormReady || !isValid()}
                onClick={startDeposit}
                isFetching={isDepositing}>
                Deposit
              </Button>
            </CardActions>
          </React.Fragment>
        )}
      </Card>
  );
};

export default compose(
  injectStripe,
  withAuth,
  withStyles(styles),
  withApiClient,
  withConfig
)(DepositPage);
