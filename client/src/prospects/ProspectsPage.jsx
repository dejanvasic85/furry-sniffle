import React, { Fragment } from 'react';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import {
  Fab,
  List,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import ProspectListItem from './ProspectListItem';
import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  prospects: {
    backgroundColor: theme.palette.background.paper
  },
  padded: {
    padding: '20px'
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


  handleProspectlick = (prospect) => {
    this.props.history.push(`/app/prospects/${prospect.id}`)
  }

  handleSearchTextchange = event => {
    const filter = event.target.value.toLowerCase();
    const filteredProspects = this.state.prospects
      .filter(({ firstName, lastName, email }) => {
        return firstName.toLowerCase().indexOf(filter) > -1 ||
          lastName.toLowerCase().indexOf(filter) > -1 ||
          email.toLowerCase().indexOf(filter) > -1;
      });

    this.setState({
      filter: event.target.value,
      filteredProspects
    });
  }

  render() {
    const { classes } = this.props;
    const { prospects, filteredProspects, filter, isFetching } = this.state;

    const prospectsToDisplay = filter
      ? filteredProspects
      : prospects;

    return <Fragment>
      {
        isFetching && <Loader />
      }
      {
        !isFetching && <Fragment>
          <Paper>
            {
              !isFetching && <Fragment>
                <div className={classes.padded}>
                  <SearchInput value={filter}
                    onSearchTextChange={this.handleSearchTextchange} />
                </div>
                <List className={classes.prospects}>
                  {
                    prospectsToDisplay.map(prospect => (<ProspectListItem
                      key={prospect.id}
                      prospect={prospect}
                      onClick={() => this.handleProspectlick(prospect)} />))
                  }
                </List>
              </Fragment>
            }
            {
              prospects.length === 0 && <Fragment>
                <div className={classes.padded}>
                  <Typography variant="h6">No prospects at the moment</Typography>
                  <Typography variant="body1">
                    Start sharing invitation with your existing clients so they could refer their friends to you...
                  </Typography>
                </div>
              </Fragment>
            }
          </Paper>
        </Fragment>
      }
    </Fragment>;
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withApiClient
)(ProspectsPage);
