import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class ClientDetails extends React.Component {
  render() {
    const { client } = this.props;
    return <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {client.firstName} {client.lastName}
          </Typography>
          <Typography component="p">
            {client.email}
          </Typography>
          <Typography component="p">
            {client.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" component={RouterLink} to={`/clients/${client.id}/edit`}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  }
}

ClientDetails.propTypes = {
  client: PropTypes.object.isRequired
}