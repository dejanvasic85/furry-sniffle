import React from 'react';
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
import Clients from './pages/Clients';
import Campaigns from './pages/Campaigns';
import AuthCallback from './auth/AuthCallback';
import Login from './auth/Login';
import Menu from './components/Menu';
import PrivateRoute from './auth/PrivateRoute';
import AuthService from './auth/AuthService';
const authService = new AuthService();

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
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
    authService.logout();
    authService.login();
  }

  render() {

    const { classes, theme } = this.props;

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
              {/* Auth Routes */}
              <Route path="/login" render={(props) => <Login {...props} auth={authService} /> }/> 
              <Route path="/callback" render={(props) => <AuthCallback {...props} auth={authService} /> }/>
              
              {/* Private Routes */}
              <PrivateRoute path="/" exact component={Home} auth={authService}/>
              <PrivateRoute path="/clients" component={Clients} auth={authService}/>
              <PrivateRoute path="/campaigns" component={Campaigns} auth={authService}/>

              {/* Fallback - Not found */}
              <Route render={() => <div>Sorry, the page you are looking for cannot be found! </div>} />
              
            </Switch>
          </main>
        </div>
      </Router>
    </>
  }
}

export default withRoot(withRouter((withStyles(styles, { withTheme: true })(App))));