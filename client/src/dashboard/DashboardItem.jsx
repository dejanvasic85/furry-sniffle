import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';
import { Grid, Typography, withStyles } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';

const styles = () => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: '20',
  },
  root: {
    padding: '20px',
  },
  title: {
    margin: '10px',
  },
  upIcon: {
    color: green[500],
  },
  downIcon: {
    color: red[500],
  },
  growth: {
    display: 'flex',
    alignItems: 'center',
  },
});

class DashboardItem extends React.Component {
  render() {
    const { title, data, classes, link } = this.props;
    if (!data) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    const createdInLastXDays = data.now - data.before;
    let beforeText = createdInLastXDays > 0 ? `+${createdInLastXDays}` : `-${createdInLastXDays}`;
    if(createdInLastXDays === 0){
      beforeText = ".";
    }
    const periodText = `last ${data.daysCount} days`;
    let growthIcon = createdInLastXDays > 0? 
      <ArrowDropUp className={classes.upIcon} />:
      <ArrowDropDown className={classes.downIcon} />;

    if (createdInLastXDays === 0) {
      growthIcon = null;
    }
 
    return (
      <div className={classes.root}>
        <Link to={link} style={{ textDecoration: 'none' }}>
        <Grid container alignItems="center">

          <Grid item xs={12}>
            <Typography variant="subtitle1">{title}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="h2">{data.now}</Typography>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.growth}>
              {growthIcon}
              <div>
                <Typography variant="h6" align="center">
                  {beforeText}
                </Typography>
                <Typography variant="body2" align="center">
                  {periodText}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        </Link>
      </div>

     
    );
  }
}

DashboardItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  data: PropTypes.shape({
    now: PropTypes.number,
    before: PropTypes.number,
    daysCount: PropTypes.string,
  }),
  icon: PropTypes.object,
};

export default compose(withStyles(styles))(DashboardItem);
