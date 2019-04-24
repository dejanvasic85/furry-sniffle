import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import Header from './components/Header';
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
  content: {
    padding: '20px'
  }
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
          <Header onLogout={this.handleLogout} />
          <main className={classes.content}>
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
          </main>
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
