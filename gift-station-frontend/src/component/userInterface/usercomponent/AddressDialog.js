import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import Information from './Information';
import { useState } from 'react';
export default function AddressDialog(props) {
    // console.log("ADD",props)
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        props.setState(false)
    };
    return (
        <div style={{ overflowY: 'none', display: 'flex' }}>
            <Dialog
                open={props.state}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {" Shipping Address"}
                    <CancelOutlinedIcon onClick={handleClose} style={{ marginLeft: '55%', marginTop: '1%' }} />
                </DialogTitle>
                <DialogContent>
                <Information Close={handleClose} userData={props.userData} setUserdata={props.setUserdata} />
                </DialogContent>
            </Dialog>
        </div>
    );
}