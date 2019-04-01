import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import GiftCardIcon from '@material-ui/icons/CardGiftcard';

import DateDisplay from './DateDisplay';
import PersonAvatar from './PersonAvatar';

export default class ClientDetails extends React.Component {
  render() {
    const { client } = this.props;
    return <>
      <Card>
        <CardHeader
          avatar={<PersonAvatar details={client} />}
          title={`${client.firstName} ${client.lastName}`}
          subheader={<>Member since: <DateDisplay date={client.createdAt} /></>}
          action={<IconButton aria-label="Edit">
            <EditIcon />
          </IconButton>}
        />

        <Divider />
        <CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText>{client.email}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><PhoneIcon /></ListItemIcon>
              <ListItemText>{client.phone}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><LinkIcon /></ListItemIcon>
              <ListItemText>{client.referralUrl}</ListItemText>
            </ListItem>
          </List>

        </CardContent>
        <Divider />
        <CardActions>

          <Button variant="outlined"
            color="secondary"
            component={RouterLink} to={`/app/clients/${client.id}/edit`}>
            <GiftCardIcon />&nbsp;Gift
          </Button>
          <Button variant="outlined"
            color="secondary"
            component={RouterLink} to={`/app/clients/${client.id}/edit`}>
            <EmailIcon />&nbsp;Email
          </Button>
        </CardActions>
      </Card>
    </>
  }
}

ClientDetails.propTypes = {
  client: PropTypes.object.isRequired
}