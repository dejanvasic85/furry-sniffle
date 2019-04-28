import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import GiftCardIcon from '@material-ui/icons/CardGiftcard';

import DateDisplay from './DateDisplay';
import PersonAvatar from './PersonAvatar';
import Button from '../components/Button';
import { apiClient } from '../apiClient';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class ClientDetails extends React.Component {
  state = {
    isEmailSending: false
  };

  handleSendGiftClick = () => {
    const clientId = this.props.client.id;
    this.props.onNewGift(clientId);
  };

  handleSendEmailClick = async () => {
    this.setState({ isEmailSending: true });
    const email = await apiClient.sendEmail(this.props.client.id);
    this.setState({ isEmailSending: false });
    this.props.onEmailSent(email);
  };

  render() {
    const { classes, client } = this.props;
    const { isEmailSending } = this.state;
    return (
      <>
        <Card>
          <CardHeader
            avatar={<PersonAvatar details={client} />}
            title={`${client.firstName} ${client.lastName}`}
            subheader={
              <>
                Member since: <DateDisplay date={client.createdAt} />
              </>
            }
            action={
              <IconButton
                aria-label="Edit"
                component={RouterLink}
                to={`/app/clients/${client.id}/edit`}
              >
                <EditIcon />
              </IconButton>
            }
          />

          <Divider />
          <CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>{client.email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText>{client.phone}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText>
                  <a
                    href={client.referralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {client.referralCode}
                  </a>
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button
              variant="outlined"
              onClick={this.handleSendGiftClick}
              color="secondary"
            >
              <GiftCardIcon />
              &nbsp;Send Gift
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              isFetching={isEmailSending}
              onClick={this.handleSendEmailClick}
            >
              <EmailIcon />
              &nbsp;Send Email
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

ClientDetails.propTypes = {
  client: PropTypes.object.isRequired,
  onEmailSent: PropTypes.func,
  onNewGift: PropTypes.func
};

export default withStyles(styles)(ClientDetails);
