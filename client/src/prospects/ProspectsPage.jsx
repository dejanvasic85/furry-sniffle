import React, { Fragment } from 'react';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import { Paper, Typography, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import RawProspectList from './RawProspectList';

import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  prospects: {
    backgroundColor: theme.palette.background.paper,
    padding: '20px'
  },
  padded: {
    padding: '20px'
  },
  divider: {
    margin: '10px'
  }
});

export class ProspectsPage extends React.Component {
  state = {
    prospects: [],
    filteredProspects: [],
    filter: '',
    isFetching: true
  };

  async componentDidMount() {
    const prospects = await this.props.api.getProspects();
    this.setState({ prospects, isFetching: false });
  }

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredProspects = this.state.prospects.filter(({ firstName, lastName, email }) => {
      return (
        firstName.toLowerCase().indexOf(filter) > -1 ||
        lastName.toLowerCase().indexOf(filter) > -1 ||
        email.toLowerCase().indexOf(filter) > -1
      );
    });

    this.setState({
      filter: event.target.value,
      filteredProspects
    });
  };

  render() {
    const { classes } = this.props;
    const { prospects, filteredProspects, filter, isFetching } = this.state;

    const prospectsToDisplay = filter ? filteredProspects : prospects;

    return (
      <Fragment>
        {isFetching && <Loader />}
        {!isFetching && (
          <Fragment>
            <Paper className={classes.padded}>
              {!isFetching && (
                <Fragment>
                  <div className={classes.padded}>
                    <SearchInput value={filter} onSearchTextChange={this.handleSearchTextchange} />
                  </div>
                  <div className={classes.prospects}>
                    <RawProspectList prospects={prospectsToDisplay} />
                  </div>
                </Fragment>
              )}
              {prospects.length === 0 && (
                <Fragment>
                  <div className={classes.padded}>
                    <Typography variant="h6">No prospects at the moment</Typography>
                    <Typography variant="body1">
                      Start sharing invitation with your existing clients so they could refer their
                      friends to you...
                    </Typography>
                  </div>
                </Fragment>
              )}
            </Paper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(ProspectsPage);
