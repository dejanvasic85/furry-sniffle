import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

import PersonAvatar from '../components/PersonAvatar';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
  },
  inline: {
    display: 'inline',
  }
});

export class ClientListItem extends React.Component {
  render() {
    const { classes, client } = this.props;
    return <ListItem alignItems="center" className={classes.root} onClick={this.props.onClick}>
      <PersonAvatar details={client} />
      <ListItemText
        primary={`${client.firstName} ${client.lastName}`}
        secondary={
          <React.Fragment>
            <Typography component="span" className={classes.inline} color="textPrimary">
              {client.email}
            </Typography>
            &nbsp; {client.phone}
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
