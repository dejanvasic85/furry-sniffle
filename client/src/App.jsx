import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

// Components
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// Custom components
import Home from './pages/Home';
import ClientsPage from './pages/ClientsPage';
import NewClientPage from './pages/NewClientPage';
import Campaigns from './pages/Campaigns';
import Menu from './components/Menu';
import PrivateRoute from './auth/PrivateRoute';
import ClientDetailsPage from './pages/ClientDetailsPage';
import ClientEditPage from './pages/ClientEditPage';
import AgentDetailsPage from './pages/AgentDetailsPage';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '600px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  logout = () => {
    const { auth } = this.props;
    auth.logout();
    auth.login();
  }

  render() {

    const { auth, classes, theme } = this.props;

    return <>
      <Router>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Agento
            </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Menu onLogout={() => this.logout() }/>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {/* Private Routes */}
              <PrivateRoute path="/app" exact component={Home} auth={auth}/>
              <PrivateRoute path="/app/agent/details" exact component={AgentDetailsPage} auth={auth} />
              <PrivateRoute path="/app/clients" exact component={ClientsPage} auth={auth}/>
              <PrivateRoute path="/app/clients/new" exact component={NewClientPage} auth={auth} />
              <PrivateRoute path="/app/campaigns" component={Campaigns} auth={auth}/>
              <PrivateRoute path="/app/clients/:id" exact={true} component={ClientDetailsPage} auth={auth} />
              <PrivateRoute path="/app/clients/:id/edit" exact={true} component={ClientEditPage} auth={auth} />
            </Switch>
          </main>
        </div>
      </Router>
    </>
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

export default withRoot(withRouter((withStyles(styles, { withTheme: true })(App))));