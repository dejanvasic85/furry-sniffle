import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from '@material-ui/core';

import PersonAvatar from './PersonAvatar';

export default class ClientDetails extends React.Component {
  render() {
    const { client } = this.props;
    return <>
      <Card>
        <CardHeader 
          avatar={<PersonAvatar details={client} />}/>
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
          <Typography component="p">
            <a href={`${client.referralUrl}`} target="_blank">
              {client.referralUrl}
            </a>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" component={RouterLink} to={`/app/clients/${client.id}/edit`}>
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