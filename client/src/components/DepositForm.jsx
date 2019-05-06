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
  gutter: {
    marginTop: '15px'
  }
});

class DepositForm extends Component {
  state = {
    isFetching: false
  };

  submit = async () => {
    const { agent } = this.props;
    const { token } = await this.props.stripe.createToken({ name: agent.email });
    const response = await this.props.api.completeDeposit(token.id);

    if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    const { accountBalance, classes } = this.props;
    const { isFetching } = this.state;

    return (
      <Card>
        <CardHeader
          title="Balance"
          subheader={<CurrencyFormat value={accountBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />} />
        <Divider />
        <CardContent>
          <Typography>In order to gift your client you must deposit money first.</Typography>
          <div className={classes.gutter}>
            <CardElement />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submit} isFetching={isFetching}>Deposit</Button>
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