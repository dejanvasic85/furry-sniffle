import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Typography,
  Chip,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import GiftCardIcon from '@material-ui/icons/CardGiftcard';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';

import DateTime from '../components/DateTime';
import Button from '../components/Button';
import ClientListItem from '../clients/ClientListItem';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatar: {
    backgroundColor: purple['600'],
    color: '#fff',
    marginRight: '20px',
  },
  newChip:{
    backgroundColor: purple['600'],
    color: '#fff',
  },
  canceledChip:{
    backgroundColor: yellow['100'],
    color: '#0e0e0e',
  },
  processedChip:{
    backgroundColor: green['400'],
    color: '#fff',
  }
});

class ProspectDetails extends React.Component {
  state = {};

  render() {
    const { classes, prospect, onCancel, onProcess } = this.props;
    const client = prospect.Client;

    const displayStatus = {
      new: <Chip label="New" className={classes.newChip}/>,
      cancelled: <Chip label="Cancelled" className={classes.canceledChip}/>,
      processed: <Chip label="Processed" className={classes.processedChip}/>,
    };

    const chip = displayStatus[prospect.status];

    const showActions = prospect.status === 'new';
    return (
      <>
        <Card>
          <CardHeader
            avatar={chip}
            title={`${prospect.firstName} ${prospect.lastName}`}
            subheader={
              <>
                enquired on <DateTime date={prospect.createdAt} />
              </>
            }
          />

          <Divider />
          <CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>{prospect.email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText>{prospect.phone}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>{prospect.message}</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Typography variant="subheading">Referred By</Typography>
            <ClientListItem client={client} />
          </CardContent>
          <Divider />

          <Divider />

          <CardActions className={classes.actions}>
            {showActions && (
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                <GiftCardIcon />
                &nbsp;Mark as invalid
              </Button>
            )}

            {showActions && (
              <Button variant="outlined" color="secondary" onClick={onProcess}>
                <EmailIcon />
                &nbsp;Mark as processed
              </Button>
            )}
          </CardActions>
        </Card>
      </>
    );
  }
}

ProspectDetails.propTypes = {
  prospect: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
};

export default compose(withStyles(styles))(ProspectDetails);
