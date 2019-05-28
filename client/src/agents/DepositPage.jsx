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

import { withApiClient, withConfig } from '../decorators';
import {
  Alert,
  Button,
  Currency,
  Loader
} from '../components';

const styles = theme => ({
  root: {
    padding: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  disclaimer: {
    color: colors.grey[600],
    marginRight: '10px',
  },
  cardElement: {
    marginTop: '8px',
    border: `1px solid ${colors.blueGrey[400]}`,
    padding: '12px',
  },
  feeSummary: {
    marginTop: '16px',
    fontSize: '16px',
    color: colors.grey[600],
  }
});

const DepositPage = ({ api, classes, config }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaymentFormReady, setIsPaymentFormReady] = useState(false);
  const [amount, setAmount] = useState(50);
  const [account, setAccount] = useState({
    balance: 0,
    availableFunds: 0
  });

  const { feeConfiguration } = config;

  useEffect(() => {
    const fetchAccount = async () => {
      const accountResponse = await api.getAccount();
      if (accountResponse) {
        setAccount(accountResponse.account);
      }

      setIsFetching(false);
    };

    if (isFetching) {
      fetchAccount();
    }

  }, [api, isFetching]);

  const startDeposit = () => {
    setIsDepositing(true);
  };

  const handlePaymentChange = event => {
    setIsPaymentFormReady(event.complete);
  };

  const handleAmountChange = event => {
    setAmount(Number(event.target.value));
  }

  const calculateTotal = () => {
    let totalAmount = 0;
    if (amount > 0) {
      const baseAmount = amount * 100;
      totalAmount = baseAmount +
        (baseAmount * (feeConfiguration.depositFeePercent / 100)) +
        feeConfiguration.depositFeeCents;
    }

    return totalAmount;
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          title="Deposit"
          subheader={<Fragment>Balance <Currency baseAmount={Number(account.balance)} /> </Fragment>} />
        <Divider />
        <CardContent>
          <TextField
            id="filled-number"
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal" />

          <Typography>
            Credit Card Details
          </Typography>

          <div className={classes.cardElement}>
            <CardElement
              hidePostalCode={true}
              style={{ base: { fontSize: '16px' } }}
              onChange={handlePaymentChange} />
          </div>

          <Typography className={classes.feeSummary}>
            Total: <Currency baseAmount={calculateTotal()} /> 
            &nbsp;(incl {feeConfiguration.depositFeePercent}% + 
            {feeConfiguration.depositFeeCents} cents fee)
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <Typography className={classes.disclaimer}>
            Please allow up to 2 working days for funds to be available
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={!isPaymentFormReady}
            onClick={startDeposit}
            isFetching={isDepositing}>
            Deposit
            </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default (
  compose(
    injectStripe,
    withStyles(styles),
    withApiClient,
    withConfig
  )(DepositPage)
);