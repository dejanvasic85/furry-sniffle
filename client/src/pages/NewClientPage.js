import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
      firstName: null,
      lastName: null,
      email: null,
      phone: null
    }
  }

  handleSave = () => {
    console.log('todo , save client', this.state.formData);
  }

  handleChange = event =>  {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }


  render() {
    const { classes } = this.props;

    return <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom align="center">New Client</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField required id="firstName" name="firstName" label="First Name" fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="lastName" name="lastName" label="Last Name" fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="email" name="email" label="Email" type="email" fullWidth onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="phone" name="phone" label="Phone" fullWidth onChange={this.handleChange} />
          </Grid>
         
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
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