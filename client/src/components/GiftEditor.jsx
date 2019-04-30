import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class GiftEditor extends React.Component {
  constructor(props) {
    super(props);
    const details = this.props.details || {};

    this.state = {
      formData: {
        message: details.message || '',
        giftValue: details.giftValue || 5,
        from: details.from || '',
        touched: {
          message: false,
          giftValue: false,
          from: false
        }
      }
    };
  }

  handleSave = () => {
    const { message, giftValue, from } = this.state.formData;

    this.props.onSave({
      message,
      giftValue,
      from
    });
  };

  handleChange = event => {
    const { formData } = this.state;
    const input = event.target;
    formData[event.target.name] = input.value;
    this.setState({ formData });
  };

  handleBlur = field => {
    const formData = {
      ...this.state.formData,
      touched: {
        ...this.state.formData.touched,
        [field]: true
      }
    };

    this.setState({ formData });
  };

  validate = ({ message, giftValue, from }) => {
    const errors = {
      message: message.length === 0,
      giftValue: giftValue < 5 || giftValue > 100 || giftValue % 5 !== 0,
      from: from.length === 0
    };
    return errors;
  };

  render() {
    const { formData } = this.state;
    const validation = this.validate(formData);
    const { classes, isFetching } = this.props;
    const showValidation = field =>
      validation[field] && this.state.formData.touched[field] === true;
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h6">Send Gift card to the client</Typography>
            <Typography>
              This operation is irreversible! Make sure you are sending gift to
              the right client.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.from}
              id="from"
              name="from"
              label="From*"
              fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('from')}
              error={showValidation('from')}
              helperText={
                showValidation('from') && 'Let know who sent the gift'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.message}
              id="message"
              name="message"
              label="Message*"
              fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('message')}
              error={showValidation('message')}
              helperText={
                showValidation('message') &&
                'Message to explain why gift is sent'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.value}
              id="giftValue"
              name="giftValue"
              label="Gift Value*"
              type="number"
              fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('giftValue')}
              error={showValidation('giftValue')}
              helperText={
                showValidation('giftValue') &&
                'Gift value - from $5 to $100 in $5 increments'
              }
            />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
                disabled={isSaveDisabled || isFetching}
              >
                Send Gift
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

GiftEditor.propTypes = {
  details: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default withStyles(styles)(GiftEditor);
