import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/Accessibility';
import PowerOffIcon from '@material-ui/icons/PowerOffOutlined';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  appName: {
    fontSize: '1.2em'
  }
});

function Menu(props) {
  const { classes, onLogout } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem>
          <Typography className={classes.appName}>Fox Rewarder</Typography>
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/app" button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/app/clients" button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem component={Link} to="/app/gifts" button>
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText primary="Gifts" />
        </ListItem>
        <ListItem component={Link} to="/app/agent/details" button>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={onLogout} button>
          <ListItemIcon>
            <PowerOffIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(Menu);
