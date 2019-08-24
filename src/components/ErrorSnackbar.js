import React, { Component } from 'react'
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';


const SnackbarContentWrapper = props => {
    
    const {message, onClose, ...others} = props; 
    
    return (
    <SnackbarContent 
        backgroundColor="#c0392b"
        message={
            <span style={{display: 'flex', alignItems: 'center'}}>
                <ErrorIcon style={{marginRight: 10}}/>
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

class ErrorSnackbar extends Component {
    render() {
        return (
            <Snackbar
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.onClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <SnackbarContentWrapper message={this.props.message} onClose={this.props.onClose} />
            </Snackbar>
        )
    }
}

export default ErrorSnackbar
