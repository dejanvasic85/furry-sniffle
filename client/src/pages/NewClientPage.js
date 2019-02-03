import React from 'react';

// Material UI
import { Grid, TextField, Typography } from '@material-ui/core';

class NewClientPage extends React.Component {
  render() {
    return <>
      <Typography variane="h6" gutterBottom>
        Client Details
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField required 
            id="firstname"
            name="firstName"
            label="First Name"
            fullWidth />
        </Grid>
      </Grid>
    </>;
  }
}

export default NewClientPage;