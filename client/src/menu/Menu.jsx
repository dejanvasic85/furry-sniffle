import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import UserIcon from '@material-ui/icons/Accessibility';
import PowerOffIcon from '@material-ui/icons/PowerOffOutlined';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import { withStyles } from '@material-ui/core/styles';

import logo from '../images/logo-pink.png';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper
  },
  appName: {
    fontSize: '1.2em'
  },
  logo: {
    width: 240
  }
});

function Menu(props) {
  const { classes, showTitle, onLogout } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {
          showTitle && <Fragment>
            <ListItem>
              <img src={logo} className={classes.logo} alt="logo" />
            </ListItem>
            <Divider />
          </Fragment>
        }
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
        <ListItem component={Link} to="/app/prospects" button>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary="Prospects" />
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
  onLogout: PropTypes.func.isRequired,
  showTitle: PropTypes.bool.isRequired
};

export default withStyles(styles)(Menu);
