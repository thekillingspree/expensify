import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
        const { title} = this.props;
        const {drawerOpen} = this.state;
        return (
            <div>
                <Drawer open={drawerOpen} onOpen={this.handleDrawerOpen} onClose={this.handleDrawerClose}/>
                <AppBar style={{zIndex: 11}} position="fixed">
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