import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { List, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import ProspectListItem from './ProspectListItem';

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
});

export class ProspectList extends React.Component {
  render() {
    const { classes, prospects } = this.props;
    return (
      <Card>
        <CardHeader title="Prospects" />
        <Divider />
        <CardContent>
          <List className={classes.prospects}>
            {prospects.map(prospect => (
              <ProspectListItem key={prospect.id} prospect={prospect} />
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}

ProspectList.propTypes = {
  prospects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ProspectList);
