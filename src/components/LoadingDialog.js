import React from 'react'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingDialog = ({open, title, msg="Please Wait"}) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <CircularProgress style={{marginRight: 20, marginBottom: 10}} size={40}/>
                    <DialogContentText>{msg}</DialogContentText>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

LoadingDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    msg: PropTypes.string
}

export default LoadingDialog
