import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { StripeProvider } from 'react-stripe-elements';

import withRoot from './withRoot';

import Header from './components/Header';
import Menu from './components/Menu';
import PageLayout from './components/PageLayout';

import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import GiftsPage from './pages/GiftsPage';
import NewClientPage from './pages/NewClientPage';
import NewGiftPage from './pages/NewGiftPage';
import Campaigns from './pages/Campaigns';
import PrivateRoute from './auth/PrivateRoute';
import ClientDetailsPage from './pages/ClientDetailsPage';
import ClientEditPage from './pages/ClientEditPage';
import AgentDetailsPage from './pages/AgentDetailsPage';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    display: 'flex',
    minHeight: '93vh'
  },
  content: {
    flex: '1 auto'
  },
  desktopMenu: {
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
});

class App extends React.Component {
  handleLogout = () => {
    this.props.auth.logout();
  };

  render() {
    const { auth, classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <StripeProvider apiKey="pk_test_up5zZ6Vfb5BBGawIb2ugkN0o00ezT4zWqH">
            <Fragment>
              <Header onLogout={this.handleLogout} />
              <div className={classes.container}>
                <div className={classes.desktopMenu}>
                  <Menu showTitle={false} onLogout={this.handleLogout} />
                </div>
                <main className={classes.content}>
                  <PageLayout>
                    <Switch>
                      {/* Private Routes */}
                      <PrivateRoute
                        path="/app"
                        exact
                        component={DashboardPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/agent/details"
                        exact
                        component={AgentDetailsPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/clients"
                        exact
                        component={ClientsPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/gifts"
                        exact
                        component={GiftsPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/clients/:id/gifts/new"
                        exact
                        component={NewGiftPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/clients/new"
                        exact
                        component={NewClientPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/campaigns"
                        component={Campaigns}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/clients/:id"
                        exact={true}
                        component={ClientDetailsPage}
                        auth={auth}
                      />
                      <PrivateRoute
                        path="/app/clients/:id/edit"
                        exact={true}
                        component={ClientEditPage}
                        auth={auth}
                      />
                    </Switch>
                  </PageLayout>
                </main>
              </div>
            </Fragment>
          </StripeProvider>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

export default withRoot(
  withRouter(withStyles(styles, { withTheme: true })(App))
);
