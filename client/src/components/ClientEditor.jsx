import React from 'react';
import PropTypes from 'prop-types';

import { Grid, TextField, Paper, Button, Switch, Typography, withStyles } from '@material-ui/core';

import emailValidator from '../services/emailValidator';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class ClientEditor extends React.Component {
  constructor(props) {
    super(props);
    const client = this.props.client || {};

    this.state = {
      formData: {
        firstName: client.firstName || '',
        lastName: client.lastName || '',
        email: client.email || '',
        phone: client.phone || '',
        sendEmail: false,
        touched: {
          firstName: false,
          lastName: false,
          email: false,
          phone: false
        }
      }
    }
  }

  handleSave = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      sendEmail
    } = this.state.formData;

    this.props.onSaveClient({
      firstName,
      lastName,
      email,
      phone,
      sendEmail
    });
  }

  handleChange = event => {
    const { formData } = this.state;
    const input = event.target;
    formData[event.target.name] = input.value;
    this.setState({ formData });
  }

  handleBlur = field => {
    const formData = {
      ...this.state.formData,
      touched: {
        ...this.state.formData.touched,
        [field]: true
      }
    }

    this.setState({ formData });
  }

  validate = ({ firstName, lastName, email, phone }) => {
    const errors = {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      email: email.length === 0 || !emailValidator(email),
      phone: phone.length === 0 || !(/^\d+$/.test(phone))
    };
    return errors;
  }

  handleSendEmailChecked = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        sendEmail: event.target.checked
      }
    });
  }

  render() {
    const { formData } = this.state;
    const validation = this.validate(formData);
    const { classes, inProgress } = this.props;
    const showValidation = field => validation[field] && this.state.formData.touched[field] === true;
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);

    return <Paper className={classes.paper}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField value={formData.firstName} id="firstName" name="firstName" label="First Name*" fullWidth
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('firstName')}
            error={showValidation('firstName')}
            helperText={showValidation('firstName') && "First name is required"} />
        </Grid>
        <Grid item xs={12}>
          <TextField value={formData.lastName} id="lastName" name="lastName" label="Last Name*" fullWidth
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('lastName')}
            error={showValidation('lastName')}
            helperText={showValidation('lastName') && "Last name is required"} />
        </Grid>
        <Grid item xs={12}>
          <TextField value={formData.email} id="email" name="email" label="Email*" type="email" fullWidth
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('email')}
            error={showValidation('email')}
            helperText={showValidation('email') && "Please provide a valid email"} />
        </Grid>
        <Grid item xs={12}>
          <TextField value={formData.phone} id="phone" name="phone" label="Phone*" fullWidth
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('phone')}
            error={showValidation('phone')}
            helperText={showValidation('phone') && "Please provide a valid phone number"} />
        </Grid>
        <Grid item xs={12}>
          <Typography>Send Welcome Email</Typography>
          <Switch checked={this.state.formData.sendEmail}
            onChange={this.handleSendEmailChecked} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              disabled={isSaveDisabled || inProgress}
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  }
}

ClientEditor.propTypes = {
  client: PropTypes.object,
  onSaveClient: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired
}

export default withStyles(styles)(ClientEditor);