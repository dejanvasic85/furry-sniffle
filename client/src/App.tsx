import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core';
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
import EmailPage from './emails/EmailPage';
import { IConfig } from './decorators/withConfig';
import { IAuth } from './auth/AuthService';

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

interface AppProps extends WithStyles<typeof styles>{
  auth: IAuth;
  config: IConfig;
}

class App extends React.Component<AppProps> {
  handleLogout = () => {
    this.props.auth.logout();
  };

  render() {
    const { classes, config } = this.props;
    
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
                          <PrivateRoute path="/app" exact component={DashboardPage} />
                          <PrivateRoute path="/app/agent/details" exact component={AgentDetailsPage} />
                          <PrivateRoute path="/app/agent/deposit" exact component={DepositPage} />
                          <PrivateRoute path="/app/clients" exact component={ClientsPage} />
                          <PrivateRoute path="/app/gifts" exact component={GiftsPage} />
                          <PrivateRoute path="/app/clients-new" exact component={NewClientPage} />
                          <PrivateRoute path="/app/clients/:id/edit" exact={true} component={ClientEditPage} />
                          <PrivateRoute path="/app/clients/:id/gifts/new" exact component={NewGiftPage} />
                          <PrivateRoute path="/app/clients/:id" exact component={ClientDetailsPage} />
                          <PrivateRoute path="/app/prospects" exact={true} component={ProspectsPage} />
                          <PrivateRoute path="/app/prospects/:id" exact={true} component={ProspectDetailsPage} />
                          <PrivateRoute path="/app/email" exact={true} component={EmailPage} />
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


export default compose(
  withRoot,
  withAuth,
  withRouter,
  withConfig,
  withStyles(styles, { withTheme: true })
)(App);
