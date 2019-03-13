import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/Accessibility'
import PowerOffIcon from '@material-ui/icons/PowerOffOutlined';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function Menu(props) {
    const { classes, onLogout } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem component={Link} to="/app" button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to="/app/clients" button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Clients" />
                </ListItem>
                <ListItem component={Link} to="/app/agent/details" button>
                    <ListItemIcon>
                        <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Details" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem onClick={onLogout} button>
                    <ListItemIcon>
                        <PowerOffIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(Menu);