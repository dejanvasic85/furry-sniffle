import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export class ClientEditor extends React.Component {
  render() {
    const validation = this.validate(this.state.formData);
    const { classes } = this.props;
    const showValidation = field => validation[field] && this.state.formData.touched[field] === true;

    return <Paper className={classes.paper}>
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
  }
}