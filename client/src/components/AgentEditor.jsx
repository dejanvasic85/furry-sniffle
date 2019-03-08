import React from 'react';
import PropTypes from 'prop-types';

import { Button, withStyles, Grid, TextField } from '@material-ui/core';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class AgentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: this.props.agent.firstName || '',
        lastName: this.props.agent.lastName || '',
        phone: this.props.agent.phone || '',
        businessName: this.props.agent.businessName || '',
        abn: this.props.agent.abn || ''
      }
    }
  }

  handleSave = () => {
    if (this.props.onSaveAgent) {
      const agent = {
        firstName: this.state.formData.firstName,
        lastName: this.state.formData.lastName,
        businessName: this.state.formData.businessName,
        abn: this.state.formData.abn,
        phone: this.state.formData.phone
      };
      this.props.onSaveAgent(agent);
    }
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

  validate = ({ firstName, lastName, phone }) => {
    const errors = {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      phone: phone.length === 0 || !(/^\d+$/.test(phone))
    };
    return errors;
  }

  showError = (validationResult, field) => {
    return validationResult[field] && this.state.formData.touched[field] === true;
  }

  render() {
    const { classes, agent } = this.props;
    const { formData } = this.state;

    const validation = this.validate(this.state.formData);
    const isSaveDisabled = Object.keys(validation).some(k => validation[k]);
    
    return <Grid container spacing={24}>
      <Grid item xs={12} md={6}>
        <TextField disabled id="email" name="email" value={agent.email} label="Email" fullWidth />
      </Grid>

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
        <TextField id="phone" name="phone" value={formData.phone} label="Phone *" fullWidth
          onChange={this.handleChange}
          onBlur={() => this.handleBlur('phone')}
          helperText={"Phone is required"} />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField id="businessName" name="businessName" value={formData.businessName} label="Business Name" fullWidth
          onChange={this.handleChange} /> 
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField id="abn" name="abn" value={formData.abn} label="ABN" fullWidth
          onChange={this.handleChange} /> 
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
    </Grid>;
  }
}

export default withStyles(styles)(AgentEditor);

AgentEditor.propTypes = {
  agent: PropTypes.object.isRequired,
  onSaveAgent: PropTypes.func.isRequired
};