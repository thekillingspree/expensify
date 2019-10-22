import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { logout, setDarkMode } from '../actions';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListIcon from '@material-ui/icons/List';
import AccountIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaletteIcon from '@material-ui/icons/Palette';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import DarkIcon from '@material-ui/icons/Brightness2';
import LightIcon from '@material-ui/icons/Brightness5';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styles from '../styles/Drawer.module.scss'
import LoadingDialog from './LoadingDialog';
import ThemeDialog from './ThemeDialog';
import { withTheme } from '@material-ui/styles';

class Drawer extends Component {

    state = {
        loggingOut: false,
        theme: false,
    }

    openPage = path => {
        this.props.history.push(path)
    }

    render() {
        const {open, onClose, user, onOpen, darkMode, theme: {palette:{ primary}}} = this.props;
        const {loggingOut, theme} = this.state;
        const {main, contrastText} = primary;
        console.log(primary)
        return (
            <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
                <LoadingDialog open={loggingOut} title="Logging Out"/>
                <ThemeDialog open={theme} handleClose={() => 
                    {
                        this.setState({theme: false})
                        onClose();
                    }} />
                <div className={styles.banner}
                style={{backgroundColor: main}}>
                    <h4 style={{color: contrastText}} className={styles.username}>{user.name}</h4>
                    <p style={{color: contrastText}} className={styles.email}>{user.email}</p>
                </div>
                <List style={{width: 250}}>
                    <ListItem button onClick={() => this.openPage('/dashboard')}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => this.openPage('/expenses')}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>All Expenses</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => this.setState({theme: true})}>
                        <ListItemIcon>
                            <PaletteIcon />
                        </ListItemIcon>
                        <ListItemText>Theme</ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => {
                        onClose();
                        this.props.setDarkMode(!darkMode)}}>
                        <ListItemIcon>
                            {darkMode ? <LightIcon /> : <DarkIcon />}
                        </ListItemIcon>
                        <ListItemText>{darkMode ? 'Light' : 'Dark'} Mode</ListItemText>
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

const mapStateToProps = ({user, theme}) => ({
    user,
    darkMode: theme.darkMode
});

Drawer.propTypes = {
    open: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
    onOpen: PropTypes.func.isRequired
}

export default withTheme(withRouter(connect(mapStateToProps, {logout, setDarkMode})(Drawer)));
