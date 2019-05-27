import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { CardElement, injectStripe } from 'react-stripe-elements';
import {
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';

import { withApiClient, withConfig } from '../decorators';
import {
  Button,
  Currency,
  Loader
} from '../components';

const styles = theme => ({
  root: {
    padding: '20px'
  }
});

const DepositPage = ({ api, classes }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isPaymentFormReady, setIsPaymentFormReady] = useState(false);
  const [account, setAccount] = useState({
    balance: 0,
    availableFunds: 0
  });

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

  if (isFetching || isDepositing) {
    return <Loader />;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        Deposit
      </Typography>
      <Typography variant="h6">
        Balance: <Currency baseAmount={Number(account.balance)} />
      </Typography>
      <Typography variant="h6">
        Available Funds: <Currency baseAmount={Number(account.availableFunds)} />
      </Typography>
      <CardElement
        hidePostalCode={true}
        style={{ base: { fontSize: '18px' } }}
        onChange={handlePaymentChange}
      />
    </Paper>
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