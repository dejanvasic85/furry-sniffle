import React from 'react';
import { Redirect } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import emailValidator from '../services/emailValidator';
import { apiClient } from '../apiClient';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class NewClientPage extends React.Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      touched: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false
      }
    },
    savedSuccessfully: false
  }

  handleSave = () => {
    apiClient.createClient(this.state.formData).then(() => {
      this.setState({savedSuccessfully: true});
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

  render() {
    if (this.state.savedSuccessfully === true) {
      return <Redirect to="/clients" />
    }

    const { classes } = this.props;
    const validation = this.validate(this.state.formData);
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);
    const showValidation = field => validation[field] && this.state.formData.touched[field] === true;

    return <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField id="firstName" name="firstName" label="First Name*" fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('firstName')}
              error={showValidation('firstName')}
              helperText={showValidation('firstName') && "First name is required"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField id="lastName" name="lastName" label="Last Name*" fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('lastName')}
              error={showValidation('lastName')}
              helperText={showValidation('lastName') && "Last name is required"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField id="email" name="email" label="Email*" type="email" fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('email')}
              error={showValidation('email')}
              helperText={showValidation('email') && "Please provide a valid email"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField id="phone" name="phone" label="Phone*" fullWidth
              onChange={this.handleChange}
              onBlur={() => this.handleBlur('phone')}
              error={showValidation('phone')}
              helperText={showValidation('phone') && "Please provide a valid phone number"} />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
                disabled={isSaveDisabled}
              >
                Save
            </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>;
  }
}

export default withStyles(styles)(NewClientPage);