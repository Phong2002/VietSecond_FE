import './ForgotPassword.css'
import LockResetIcon from '@mui/icons-material/LockReset';
import React from 'react';
import { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { validEmail } from '../../../validator/validate'
import { URL_API } from '../../../api/Url.js'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class FluidInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: ""
        };
    }
    focusField() {
        const { focused } = this.state;
        this.setState({
            focused: !focused
        });
    }
    handleChange(event) {
        const { target } = event;
        const { value } = target;
        this.setState({
            value: value
        });
        this.props.onChange(value)
    }
    render() {
        const { type, label, style, id } = this.props;
        const { focused, value } = this.state;

        let inputClass = "fluid-input";
        if (focused) {
            inputClass += " fluid-input--focus";
        } else if (value !== "") {
            inputClass += " fluid-input--open";
        }

        return (
            <div className={inputClass} style={style}>
                <div className="fluid-input-holder">

                    <input
                        className="fluid-input-input"
                        type={type}
                        id={id}
                        onFocus={this.focusField.bind(this)}
                        onBlur={this.focusField.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        autoComplete="off"
                    />
                    <label className="fluid-input-label" forhtml={id}>{label}</label>

                </div>
            </div>
        );
    }
}

const style = {
    marginTop: "20px "
};

function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [backdrop,setBackdrop] = useState(false)
    const [dialog,setDialog] = useState(false)

    const handleForgotPassword = () => {
        setMessage('')
        if (!email) {
            setMessage("Vui l??ng nh???p email c???a b???n !")
        }
        else if (!validEmail.test(email)) {
            setMessage("Email kh??ng ????ng ?????nh d???ng !")
        }
        else {
            setBackdrop(true)
            let config = {
                method: 'post',
                url: `${URL_API}user/reset-password/${email}`,
                headers: {}
            };

            axios(config)
                .then((response) => {
                    console.log(response);
                    setBackdrop(false);
                    setDialog(true)
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.message === 'This user requested to reset the password') {
                        setMessage('B???n ???? g???i y??u c???u n??y tr?????c ????y ! Vui l??ng ki???m tra l???i trong email')
                    }
                    else if (error.response.data.message === 'Email is not exists') {
                        setMessage('Xin l???i! Email n??y kh??ng t???n t???i')
                    }
                    setBackdrop(false)
                });
        }
    }
    return (
        <div className="forgot-password-container">
            <div className="forgot-password">
                <LockResetIcon sx={{ fontSize: 200, color: '#3fbe56' }}></LockResetIcon>
                <div className="forgot-password-title">Vui l??ng ??i???n email ???? ????ng k?? c???a b???n d?????i ????y. Ch??ng t??i s???
                    g???i ???????ng d???n t???o m???t kh???u m???i ?????n email c???a b???n.</div>
                <FluidInput type="text" label="Email" id="email" style={style} onChange={setEmail} value={email} />
                <div className={`message-forgot ${message ? "" : "padding-30"}`}>{message}</div>
                <Button sx={{ backgroundColor: '#3fbe56' }} color="success" variant="contained" onClick={handleForgotPassword}>Qu??n m???t kh???u</Button>
            </div>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <div>
            <Dialog
        open={dialog}
        onClose={()=>setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Qu??n m???t kh???u"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="dialog-message"> Ch??ng t??i v???a g???i cho b???n ???????ng d???n ????? t???o m???t kh???u m???i cho t??i kho???n c???a b???n. Vui l??ng ki???m tra trong email c???a b???n !</p> 
            <p className="dialog-sig" ><i><b>Tr??n tr???ng,</b></i></p>
            <p className="dialog-sig color"><i><b>VietSecond</b></i></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
            </div>
        </div>
    );
}

export default ForgotPassword;