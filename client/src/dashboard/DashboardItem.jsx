import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';

import { Card, CardContent, Divider, Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: '20',
  },
  card: {
    padding: '20',
  },
  title: {
    margin: '10px',
  },
});

class DashboardItem extends React.Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    const { icon, title, data, classes } = this.props;
    if (!data) {
      return (
        <Card>
          {' '}
          <Loader />
        </Card>
      );
    }

    const createdInLastXDays = data.now - data.before;

    const previous = createdInLastXDays ? `${createdInLastXDays} in last ${data.daysCount} days` : '... ';

    return (
      <Card>
        <CardContent>
          <div className={classes.header}>
            {icon}
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
          </div>

          <Typography variant="h5">{data.now}</Typography>
          <Typography variant="subtitle1">{previous}</Typography>
        </CardContent>
        <Divider />
      </Card>
    );
  }
}

DashboardItem.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    now: PropTypes.number,
    before: PropTypes.number,
    daysCount: PropTypes.number,
  }),
  icon: PropTypes.object,
  onClick: PropTypes.func,
};

export default compose(withStyles(styles))(DashboardItem);
