import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {  Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import DashboardProspectListItem from './DashboardProspectListItem';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  prospects: {
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  divider:{
    margin:'10px'
  }
});

export class ProspectList extends React.Component {
  render() {
    const { classes, prospects } = this.props;
    return (
      <Card>
        <CardHeader title="Prospects" />
        <Divider />
        <CardContent>
        
            {prospects.map(prospect => (
              <Fragment>
              <DashboardProspectListItem key={prospect.id} prospect={prospect} />
              <Divider className={classes.divider} />
              </Fragment>
            ))}
         
        </CardContent>
      </Card>
    );
  }
}

ProspectList.propTypes = {
  prospects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ProspectList);
