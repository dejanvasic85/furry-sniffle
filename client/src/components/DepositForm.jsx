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
    maxWidth: '400px'
  },
  gutter: {
    marginTop: '10px'
  }
});

class DepositForm extends Component {
  state = {
    amount: 50,
    isFetching: false,
    depositComplete: false
  };

  submit = async () => {
    this.setState({ isFetching: true });
    const { agent } = this.props;
    const { token } = await this.props.stripe.createToken({ name: agent.email });
    const response = await this.props.api.completeDeposit(token.id);

    if (response.ok) {
      console.log("Deposit Complete!");
      this.setState({ isFetching: false, depositComplete: true });
    }
  }

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  }

  render() {
    const { accountBalance, classes } = this.props;
    const { amount, isFetching } = this.state;

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
            <div className={classes.gutter}>
              <CardElement hidePostalCode={true} />
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            disabled={amount <= 0}
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