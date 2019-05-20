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
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import GiftCardIcon from '@material-ui/icons/CardGiftcard';

import DateDisplay from '../components/DateDisplay';
import Button from '../components/Button';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class ProspectDetails extends React.Component {
  state = {};

  render() {
    const { classes, prospect } = this.props;

    return (
      <>
        <Card>
          <CardHeader
            title={`${prospect.firstName} ${prospect.lastName}`}
            subheader={
              <>
                enquired at: <DateDisplay date={prospect.createdAt} />
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
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button variant="outlined" color="secondary">
              <GiftCardIcon />
              &nbsp;Mark as invalid
            </Button>

            <Button variant="outlined" color="secondary">
              <EmailIcon />
              &nbsp;Mark as processed
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

ProspectDetails.propTypes = {
  prospect: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(ProspectDetails);
