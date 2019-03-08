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
  state = {
    formData: {
      firstName: this.props.agent.firstName || '',
      lastName: this.props.agent.lastName || ''
    }
  }

  handleSave = () =>  {
    if (this.props.onSaveAgent) {
      const agent = {
        firstName: this.state.formData.firstName,
        lastName: this.state.formData.lastName
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

  render() {
    const { classes } = this.props;
    const { formData } = this.state;

    return <Grid container spacing={24}>
      <Grid item xs={12} md={6}>
        <TextField id="firstName" name="firstName" value={formData.firstName} label="First Name*" fullWidth
          onChange={this.handleChange}
          onBlur={() => this.handleBlur('firstName')}
          helperText={"First name is required"} />
      </Grid>

      <Grid item xs={12}>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSave}
            disabled={false}
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