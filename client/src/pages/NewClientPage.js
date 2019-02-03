import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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

class NewClientPage extends React.Component {
  handleSave = () => {
    console.log('todo , save client');
  }

  render() {
    const { classes } = this.props;

    return <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom align="center">New Client</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField required id="firstName" label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="lastName" label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="phoneNumber" label="Phone" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="adoptionDate" label="Client since" fullWidth />
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