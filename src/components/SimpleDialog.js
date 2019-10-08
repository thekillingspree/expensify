import React from 'react'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const SimpleDialog = ({open, title, msg="Please Wait", onSuccess, onSuccessMessage}) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{msg}</DialogContentText>
                <DialogActions>
                    <Button onClick={onSuccess} color="primary">
                        {onSuccessMessage}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

SimpleDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
}

export default SimpleDialog
