import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import styles from '../styles/ThemeDrawer.module.scss'
import { setTheme } from '../actions'
import { themeColors as colors } from '../constants'
import Tooltip from '@material-ui/core/Tooltip';

const ColorCircle = connect(null, {setTheme})(({name, color, handleClose, setTheme}) => {
    return (
       <Tooltip title={name}>
            <div 
            onClick={() => {
                setTheme(color);
                handleClose();
            }} className={styles.color} style={{backgroundColor: color}}/>
       </Tooltip>
    )
})

const ThemeDialog = props => {
    const {open, handleClose, setTheme} = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose a Theme</DialogTitle>
            <DialogContent style={{display: 'flex', flexWrap: 'wrap'}}>
               {Object.keys(colors).map(color => {
                   let name = color[0].toUpperCase() + color.slice(1);
                   return (
                    <ColorCircle handleClose={handleClose} name={name} color={colors[color]} />
                   )
               })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ThemeDialog;
