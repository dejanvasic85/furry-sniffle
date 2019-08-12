import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  withStyles
} from '@material-ui/core';

import Button from '../components/Button';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  padded:{
    padding:'20px'
  }
});

class AgentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      formData: {
        firstName: this.props.agent.firstName || '',
        lastName: this.props.agent.lastName || '',
        phone: this.props.agent.phone || '',
        businessName: this.props.agent.businessName || '',
        abn: this.props.agent.abn || '',
        touched: []
      }
    };
  }

  handleSave = async () => {
    this.setState({ isFetching: true });
    const agent = {
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      businessName: this.state.formData.businessName,
      abn: this.state.formData.abn,
      phone: this.state.formData.phone
    };
    await this.props.onSaveAgent(agent);
    this.setState({ isFetching: false });
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

  validate = ({ firstName, lastName, phone }) => {
    const errors = {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      phone: phone.length === 0 || !/^\d+$/.test(phone)
    };
    return errors;
  };

  showError = (validationResult, field) => {
    return validationResult[field] && this.state.formData.touched[field] === true;
  };

  render() {
    const { classes, agent } = this.props;
    const { isFetching, formData } = this.state;

    const validation = this.validate(this.state.formData);
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);

    return (
      <Fragment>
        <Card className={classes.padded}>
          <CardHeader title="My Details" subheader={`Email: ${agent.email}`} />
          <Divider />
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  label="First Name*"
                  fullWidth
                  onChange={this.handleChange}
                  onBlur={() => this.handleBlur('firstName')}
                  error={this.showError(validation, 'firstName')}
                  helperText={'First name is required'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  label="Last Name*"
                  fullWidth
                  onChange={this.handleChange}
                  onBlur={() => this.handleBlur('lastName')}
                  error={this.showError(validation, 'lastName')}
                  helperText={'Last name is required'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  label="Phone *"
                  fullWidth
                  onChange={this.handleChange}
                  onBlur={() => this.handleBlur('phone')}
                  helperText={'Phone is required'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  label="Business Name"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="abn"
                  name="abn"
                  value={formData.abn}
                  label="ABN"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              disabled={isSaveDisabled}
              isFetching={isFetching}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AgentEditor);

AgentEditor.propTypes = {
  agent: PropTypes.object.isRequired,
  onSaveAgent: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};
