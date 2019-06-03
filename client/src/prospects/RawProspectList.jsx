import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProspectListItem from './ProspectListItem';

const styles = theme => ({
  prospects: {
    marginTop: '12px',
    marginBottom: '8px',
  },
});

class RawProspectList extends React.Component {
  render() {
    const { prospects, classes } = this.props;
    return prospects.map((prospect, index) => (
      <div key={prospect.id}>
        <ProspectListItem prospect={prospect} />
        {index < prospects.length - 1 && <Divider className={classes.prospects} />}
      </div>
    ));
  }
}

RawProspectList.propTypes = {
  prospects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default compose(withStyles(styles))(RawProspectList);
