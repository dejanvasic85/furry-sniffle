import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {  Card, CardContent, CardHeader, Divider } from '@material-ui/core';

import RawProspectList from './RawProspectList';

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
    const { prospects } = this.props;
    return (
      <Card>
        <CardHeader title="Prospects" />
        <Divider />
        <CardContent>
        
          <RawProspectList prospects={prospects} />
         
        </CardContent>
      </Card>
    );
  }
}

ProspectList.propTypes = {
  prospects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ProspectList);
