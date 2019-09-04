import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListIcon from '@material-ui/icons/List';
import AccountIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaletteIcon from '@material-ui/icons/Palette';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styles from '../styles/Drawer.module.scss'
import LoadingDialog from './LoadingDialog';

class Drawer extends Component {

    state = {
        loggingOut: false
    }

    render() {
        const {open, onClose, user, onOpen} = this.props;
        const {loggingOut} = this.state;
        return (
            <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
                <LoadingDialog open={loggingOut} title="Logging Out"/>
                <div className={styles.banner}>
                    <h4 className={styles.username}>{user.name}</h4>
                    <p className={styles.email}>{user.email}</p>
                </div>
                <List style={{width: 250}}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>All Expenses</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PaletteIcon />
                        </ListItemIcon>
                        <ListItemText>Theme</ListItemText>
                    </ListItem>
                    <ListItem button onClick={async () => {
                        this.setState({loggingOut: true});
                        await this.props.logout()
                        this.setState({loggingOut: false});
                    }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        );
    }
}

const mapStateToProps = ({user}) => ({
    user
});

Drawer.propTypes = {
    open: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
    onOpen: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logout})(Drawer)
