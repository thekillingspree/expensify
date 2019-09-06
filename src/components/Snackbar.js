import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Snack from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/Snack.module.scss';


const variantIcons = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    info: InfoIcon
}

const SnackbarContentWrapper = props => {
    
    const {message, onClose, variant="info", ...others} = props; 
    const Icon = variantIcons[variant];
    return (
    <SnackbarContent 
        className={styles[variant]}
        message={
            <span style={{display: 'flex', alignItems: 'center'}}>
                <Icon style={{marginRight: 10}}/>
                {props.message}
            </span>
        }
        action={[
            <IconButton color="inherit" onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        ]}
        {...others}
    />);
}

class Snackbar extends Component {
    render() {
        return (
            <Snack
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.onClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <SnackbarContentWrapper  variant={this.props.variant} message={this.props.message} onClose={this.props.onClose} />
            </Snack>
        )
    }
}

Snackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['error', 'success', 'info'])
}

export default Snackbar
