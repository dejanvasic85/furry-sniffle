import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  inline: {
    display: 'inline',
  },
  userIcon: {
    border: '1px solid #eee',
    borderRadius: '50%',
    textAlign: 'center',
    padding: '10px'
  }
});

export class ClientListItem extends React.Component {
  render() {
    const { classes, client } = this.props;
    return <ListItem alignItems="center" className={classes.root} onClick={this.props.onClick}>
      <div className={classes.userIcon}>
        <Typography component="h5" variant="h5">
          {client.firstName.substring(0, 1).toUpperCase()}
          {client.lastName.substring(0, 1).toUpperCase()}
        </Typography>
      </div>
      <ListItemText
        primary={`${client.firstName} ${client.lastName}`}
        secondary={
          <React.Fragment>
            <Typography component="span" className={classes.inline} color="textPrimary">
              {client.email}
            </Typography>
            {` Referral Code: ${client.referralCode} `}
          </React.Fragment>
        }
      />
    </ListItem>;
  }
}

ClientListItem.propTypes = {
  client: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ClientListItem);
