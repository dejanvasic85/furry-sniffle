import React from 'react';
import { compose } from 'recompose';
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
  colors,
  withStyles
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GiftCardIcon from '@material-ui/icons/CardGiftcard';

import withApiClient from '../decorators/withApiClient';
import DateDisplay from '../components/DateDisplay';
import PersonAvatar from '../components/PersonAvatar';
import Button from '../components/Button';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  helpText: {
    color: colors.grey[600]
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
    const email = await this.props.api.sendEmail(this.props.client.id);
    this.setState({ isEmailSending: false });
    this.props.onEmailSent(email);
  };

  render() {
    const { classes, client, giftCount, prospectCount } = this.props;
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
                to={`/app/clients/${client.id}/edit`}>
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
                  Referral URL: &nbsp;
                  <a href={client.referralUrl} target="_blank" rel="noopener noreferrer">
                    {client.referralCode}
                  </a>
                  <br />
                  <span className={classes.helpText}>
                    Each client has their own identifiable URL for your prospects.
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText>
                  Number of Prospects:
                  {prospectCount}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CardGiftcardIcon />
                </ListItemIcon>
                <ListItemText>
                  Number Of Gifts:
                  {giftCount} <br />
                  <span className={classes.helpText}>For each prospect there should be a gift to your client.</span>
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button variant="outlined" onClick={this.handleSendGiftClick} color="secondary">
              <GiftCardIcon />
              &nbsp;Send Gift
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              isFetching={isEmailSending}
              onClick={this.handleSendEmailClick}>
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
  onNewGift: PropTypes.func,
  prospectCount: PropTypes.number,
  giftCount: PropTypes.number
};

export default compose(
  withStyles(styles),
  withApiClient
)(ClientDetails);
