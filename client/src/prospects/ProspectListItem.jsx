import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import PersonAvatar from '../components/PersonAvatar';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  inline: {
    display: 'inline',
  },
});

export class ProspectListItem extends React.Component {
  render() {
    const { classes, prospect } = this.props;
    return (
      <ListItem alignItems="center" className={classes.root} component={Link} to={`/app/prospects/${prospect.id}`}>
       <QuestionAnswerIcon></QuestionAnswerIcon>
        <ListItemText
          primary={`${prospect.firstName} ${prospect.lastName}`}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {prospect.email}
              </Typography>
              &nbsp; {prospect.phone}
              <div>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Referred by
                </Typography>
                &nbsp; {prospect.Client.firstName} {prospect.Client.lastName}
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }
}

ProspectListItem.propTypes = {
  prospect: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProspectListItem);
