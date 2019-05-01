import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';

import { apiClient } from '../apiClient';
import emailValidator from '../services/emailValidator';
import Button from '../components/Button';

const whiteTextStyle = {
  color: '#FFFFFF'
};
const styles = theme => ({
  root: {},
  centered: {
    textAlign: 'center'
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  fontMain: {
    color: '#757575'
  },
  fontGreyed: {
    color: '#8E8E96'
  },
  separator: {
    color: '#A9A9A9'
  },
  submitTutton: {
    color: '#4EAE3E'
  },
  container: {
    padding: '20px'
  },
  tinted: {
    '&::before': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0,0,255, 0.5)'
    }
  },

  contactFormTitle: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '64px 15px 64px 15px',
    backgroundImage: 'url("/adult-agreement.jpg")',
    marginBottom: '20px',
    '&::before': {
      zIndex: -1,
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(54,84,99,0.7);'
    }
  },

  hero: {
    background: 'url("/adult-agreement.jpg") no-repeat left top',
    backgroundSize: 'cover',
    height: '150px',
    width: '560px',
    marginBottom: '20px'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

class InvitationPage extends React.Component {
  state = {
    completed: false,
    isFetching: true,
    isValid: null,
    invite: null,
    formData: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
      touched: []
    }
  };

  async componentDidMount() {
    const { referralCode } = this.props.match.params;

    this.setState({ isFetching: true });
    const result = await apiClient.invite({ referralCode });
    this.setState({
      isValid: true,
      invite: result.invite,
      isFetching: false
    });
  }

  validate = ({ firstName, lastName, email, phone }) => {
    const errors = {
      firstName: firstName.length === 0,
      email: email.length === 0 || !emailValidator(email),
      phone: phone.length === 0 || !/^\d+$/.test(phone)
    };
    return errors;
  };

  showError = (validationResult, field) => {
    return (
      validationResult[field] && this.state.formData.touched[field] === true
    );
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

  showValidation = (validation, field) => {
    return validation[field] && this.state.formData.touched[field] === true;
  };

  handleSubmit = async () => {
    this.setState({
      fetching: true
    });

    const validation = this.validate(this.state.formData);
    
    const hasErrors = Object.keys(validation).some(k => validation[k]);

    if (hasErrors) {
      return;
    }

    const { agentId, clientId } = this.state.invite;
    const prospect = Object.assign({}, this.state.formData, {
      agentId,
      clientId
    });

    this.setState({ isFetching: true });
    const result = await apiClient.createProspect(prospect);
    this.setState({
      isFetching: false,
      completed: true
    });
  };

  render() {
    const { isValid, invite, formData, completed, isFetching } = this.state;

    const { classes } = this.props;
    const validation = this.validate(this.state.formData);

    if (completed) {
      return (
        <div className={classes.centered}>
          <Typography variant="h4">
            Thank you! {invite.agentName} has been notified and he'll be in
            touch with you shortly.
          </Typography>
        </div>
      );
    }

    return (
      <main className={classes.layout}>
        <Paper>
          {isValid === false && <Redirect to="/not-found" />}
          {invite && (
            <div>
              <div className={classes.contactFormTitle}>
                <Typography
                  style={whiteTextStyle}
                  variant="h4"
                  gutterBottom
                  align="center"
                >
                  Contact {invite.agentName}
                </Typography>

                <Typography
                  style={whiteTextStyle}
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Your trusted friend {invite.clientName} has referred you
                </Typography>
              </div>
              <div className={classes.container}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      label="Your name"
                      fullWidth
                      onChange={this.handleChange}
                      onBlur={() => this.handleBlur('firstName')}
                      error={this.showError(validation, 'firstName')}
                      helperText={'Please tell me who you are'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      value={formData.email}
                      label="Your email"
                      fullWidth
                      onChange={this.handleChange}
                      onBlur={() => this.handleBlur('email')}
                      error={this.showError(validation, 'email')}
                      helperText={
                        this.showValidation('email') &&
                        'Please provide a valid email'
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      label="Your phone"
                      fullWidth
                      onChange={this.handleChange}
                      onBlur={() => this.handleBlur('phone')}
                      error={this.showError(validation, 'phone')}
                      helperText={
                        this.showValidation('phone') &&
                        'Please provide a valid phone'
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="phone"
                      name="message"
                      value={formData.message}
                      label="Message"
                      fullWidth
                      onChange={this.handleChange}
                      onBlur={() => this.handleBlur('message')}
                      error={this.showError(validation, 'message')}
                      helperText={'Any additional information I need to know'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div className={classes.buttons}>
                      <Button
                        color="primary"
                        variant="outlined"
                        size="large"
                        onClick={this.handleSubmit}
                        isFetching={isFetching}
                      >
                        Get in touch
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </Paper>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(InvitationPage));
