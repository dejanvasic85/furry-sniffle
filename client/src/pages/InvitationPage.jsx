import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { apiClient } from '../apiClient';
import emailValidator from '../services/emailValidator';

const styles = theme => ({
  root: {
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  container: {
    padding: '20px'
  }
});

class InvitationPage extends React.Component {
  state = {
    fetching: true,
    isValid: null,
    invite: null,
    formData: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      touched: []
    }
  }

  componentDidMount() {
    const { agentId, referralCode } = this.props.match.params;

    apiClient.invite({agentId, referralCode}).then(result => {
      this.setState({
        isValid: true,
        invite: result.invite,
        fetching: false
      });
    }).catch(err => {
      this.setState({ isValid: false });
    });
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

  showError = (validationResult, field) => {
    return validationResult[field] && this.state.formData.touched[field] === true;
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

  showValidation = (validation, field) => {
    return validation[field] && this.state.formData.touched[field] === true
  }

  handleSubmit = () => {
    this.setState({
      fetching: true
    });

    const { agentId, clientId } = this.state.invite;
    const prospect = Object.assign({}, this.state.formData, {
      agentId,
      clientId
    });

    apiClient.createProspect(prospect).then(result => {
      this.setState({
        fetching: false,
        completed: true
      });
    });
  }

  render() {
    const { isValid, invite, formData, completed, fetching } = this.state;
    const { classes } = this.props;
    const validation = this.validate(this.state.formData);
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);

    return <Paper className={classes.container}>
      {isValid === false && <Redirect to="/not-found" />}


      {
        invite && <div>
          <Typography variant="h4" gutterBottom>
            Hey there! Your trusted friend {invite.clientName} has referred you to
            checkout services offered by {invite.agentName}. Fill out the form below to get in touch.
          </Typography>

          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField id="firstName" name="firstName" value={formData.firstName} label="First Name*" fullWidth
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('firstName')}
                error={this.showError(validation, 'firstName')}
                helperText={"First name is required"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField id="lastName" name="lastName" value={formData.lastName} label="Last Name*" fullWidth
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('lastName')}
                error={this.showError(validation, 'lastName')}
                helperText={"Last name is required"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField id="email" name="email" value={formData.email} label="Email*" fullWidth
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('email')}
                error={this.showError(validation, 'email')}
                helperText={this.showValidation('email') && "Please provide a valid email"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField id="phone" name="phone" value={formData.phone} label="Phone*" fullWidth
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('phone')}
                error={this.showError(validation, 'phone')}
                helperText={this.showValidation('email') && "Please provide a valid email"} />
            </Grid>

            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  disabled={isSaveDisabled}>
                  Submit
            </Button>
              </div>
              {completed === true && <Paper>Thank you for completing the form. {invite.agentName} will be in touch  with you shortly!</Paper>}
            </Grid>
          </Grid>

        </div>
      }

    </Paper>;
  }
}

export default withRouter(withStyles(styles)(InvitationPage));