import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';

import Menu from './Menu';

import logo from '../images/biz-logo.png';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  headerIcons: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  balance: {
    color: '#fff',
  },
  drawer: {
    minWidth: '240px',
  },
  logo: {
    height: 35,
    width: 35,
    marginRight: '8px'
  }
});

class Header extends React.Component {
  state = {
    isDrawerOpened: false,
  };

  handleDrawerToggle = () => {
    const isOpened = this.state.isDrawerOpened;
    this.setState({ isDrawerOpened: !isOpened });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawerOpened: false });
  };

  handleLogoutClick = () => {
    this.props.onLogout();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} className={classes.logo} />
            <Typography variant="h6" color="inherit" noWrap>
              Biz Rewarder
            </Typography>
            <div className={classes.grow} />
            <Link className={classes.headerIcons} to="/app/agent/details">
              <IconButton aria-haspopup="true" color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.isDrawerOpened} onClose={this.handleDrawerClose}>
          <div className={classes.drawer} tabIndex={0} role="button" onClick={this.handleDrawerToggle}>
            <Menu onLogout={this.handleLogoutClick} showTitle={true} />
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
