import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  headerIcons: {
    display: 'flex',
    alignItems: 'center'
  }, 
  balance: {
    color: '#fff'
  }
});

class Header extends React.Component {
  handleAccountClick = () => {
    console.log('clicking');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Fox Rewarder
            </Typography>
            <div className={classes.grow} />
            <div className={classes.headerIcons}>
              <Typography className={classes.balance}>
                Balance $0
              </Typography>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleAccountClick}>
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);