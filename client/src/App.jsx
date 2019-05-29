import React, { Fragment } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';

import withRoot from './withRoot';
import { withConfig, withAuth } from './decorators';

import Header from './menu/Header';
import Menu from './menu/Menu';
import PageLayout from './menu/PageLayout';

import DashboardPage from './dashboard/DashboardPage';
import ClientsPage from './clients/ClientsPage';
import ProspectsPage from './prospects/ProspectsPage';
import ProspectDetailsPage from './prospects/ProspectDetailsPage';
import GiftsPage from './gifts/GiftsPage';
import NewClientPage from './clients/NewClientPage';
import NewGiftPage from './gifts/NewGiftPage';
import PrivateRoute from './auth/PrivateRoute';
import ClientDetailsPage from './clients/ClientDetailsPage';
import ClientEditPage from './clients/ClientEditPage';
import AgentDetailsPage from './agents/AgentDetailsPage';
import DepositPage from './agents/DepositPage';

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    minHeight: '93vh', // We need a better way to do this. 93 is a random number
  },
  content: {
    flex: '1 auto',
  },
  desktopMenu: {
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

class App extends React.Component {
  handleLogout = () => {
    this.props.auth.logout();
  };

  render() {
    const { auth, classes, config } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <StripeProvider apiKey={config.stripe_key}>
            <Fragment>
              <Header onLogout={this.handleLogout} />
              <div className={classes.container}>
                <div className={classes.desktopMenu}>
                  <Menu showTitle={false} onLogout={this.handleLogout} />
                </div>
                <main className={classes.content}>
                  <PageLayout>
                    <Switch>
                      <Elements>
                        <div>
                          {/* Private Routes */}
                          <PrivateRoute path="/app" exact component={DashboardPage} auth={auth} />
                          <PrivateRoute path="/app/agent/details" exact component={AgentDetailsPage} auth={auth} />
                          <PrivateRoute path="/app/agent/deposit" exact component={DepositPage} auth={auth} />
                          <PrivateRoute path="/app/clients" exact component={ClientsPage} auth={auth} />
                          <PrivateRoute path="/app/gifts" exact component={GiftsPage} auth={auth} />
                          <PrivateRoute path="/app/clients/:id/gifts/new" exact component={NewGiftPage} auth={auth} />
                          <PrivateRoute path="/app/clients/new" exact component={NewClientPage} auth={auth} />
                          <PrivateRoute path="/app/clients/:id" exact={true} component={ClientDetailsPage} auth={auth} />
                          <PrivateRoute path="/app/clients/:id/edit" exact={true} component={ClientEditPage} auth={auth} />
                          <PrivateRoute path="/app/prospects" exact={true} component={ProspectsPage} auth={auth} />
                          <PrivateRoute
                            path="/app/prospects/:id"
                            exact={true}
                            component={ProspectDetailsPage}
                            auth={auth}
                          />
                        </div>
                      </Elements>
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
  auth: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withAuth,
  withRouter,
  withConfig,
  withStyles(styles, { withTheme: true })
)(App);
