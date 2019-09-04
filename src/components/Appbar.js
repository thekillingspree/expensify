import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PaletteIcon from '@material-ui/icons/Palette';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from '../styles/AppBar.module.scss';
import Drawer from './Drawer';

class Appbar extends Component {

    state = {
        anchor: null,
        drawerOpen: false
    }

    handleDrawerOpen = event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
        this.setState({drawerOpen: true})
    }

    handleDrawerClose = () => {
        this.setState({drawerOpen: false})
    }

    render() {
        const {user, title} = this.props;
        const {drawerOpen} = this.state;
        return (
            <div>
                <Drawer open={drawerOpen} onOpen={this.handleDrawerOpen} onClose={this.handleDrawerClose}/>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton edge="start" className={styles.menuIcon} onClick={this.handleDrawerOpen} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <h3 className={styles.title}>{title}</h3>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Appbar.propTypes = {
    title: PropTypes.string.isRequired
}

const mapStateToProps = ({user}) => {
    return {
        user 
    }
}

export default connect(mapStateToProps)(Appbar);