import { useLocation, useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import { URL_API } from '../../../api/Url'
import './UpdatePasswordForgot.css'
import PasswordIcon from '@mui/icons-material/Password';
import {
    useNavigate
} from "react-router-dom";
import { validPassword } from '../../../validator/validate'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import viLocale from 'date-fns/locale/vi';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

function UpdatePasswordForgot() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [mess_password, setMess_password] = useState('')
    const [mess_confirmPassword, setMess_confirmPassword] = useState('')

    const params = useParams();
    const [backdrop,setBackdrop] = useState(false)
    const [dialog,setDialog] = useState(false)

    const handleChangePassword = (event) => {
        setMess_password("")
        setPassword(event.target.value);
        if (event.target.value && !validPassword.test(event.target.value)) {
            setMess_password("Ph???i c?? ??t nh???t 8 k?? t???, trong ???? c?? ??t nh???t 1 ch??? c??i, 1 ch??? s??? v?? 1 k?? t??? ?????c bi???t!")
        }
    };

    const handleChangeConfirmPassword = (value) => {
        setMess_confirmPassword("")
        setConfirmPassword(value);
        if (value && !(password === value)) {
            setMess_confirmPassword("M???t kh???u nh???p l???i ph???i gi???ng v???i m???t kh???u ???? nh???p!")
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        let result = true;

        if (mess_password!=='' || mess_confirmPassword!=='') {
            result = false;
        }

        if (mess_password === "Tr?????ng n??y kh??ng ???????c b??? tr???ng") {
            setMess_password("")
        }
        if (mess_confirmPassword === "Tr?????ng n??y kh??ng ???????c b??? tr???ng") {
            setMess_confirmPassword("")
        }
        if (!password) {
            setMess_password("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!confirmPassword) {
            setMess_confirmPassword("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        return result
    }

    const updatePassword = () => {
        let data = password;
        setBackdrop(true)
        let config = {
            method: 'put',
            url: `${URL_API}user/reset-password/${params.token}`,
            headers: {
                'Content-Type': 'text/plain'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                setBackdrop(false)
                setDialog(true)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                setBackdrop(false)
                console.log(error.response.data);
            });
    }

    const handleUpdatePass = () => {
        if (validate()) {
            updatePassword();
        }
    }
    let navigate = useNavigate();


    return (
        <div className="reset-password-container">
            <div className="reset-password">
                <PasswordIcon sx={{ fontSize: 200, color: '#3fbe56' }} />
                <h1 className="update-pass-title">?????t l???i m???t kh???u</h1>

                <div >

                    <FormControl sx={{ width: '100%' }} variant="outlined"
                        error={mess_password}

                    >
                        <InputLabel htmlFor="password">M???t kh???u</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText id="helper-text">{mess_password}</FormHelperText>
                    </FormControl>
                </div>

                <div  >

                    <FormControl sx={{ width: '100%' }} variant="outlined"
                        error={mess_confirmPassword}
                    >

                        <InputLabel htmlFor="confirm-password">Nh???p l???i m???t kh???u</InputLabel>
                        <OutlinedInput

                            id="confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => handleChangeConfirmPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Nh???p l???i m???t kh???u"
                        />
                        <FormHelperText id="helper-text">{mess_confirmPassword}</FormHelperText>
                    </FormControl>
                </div>
                <Button sx={{ backgroundColor: '#3fbe56' }} color="success" variant="contained" onClick={handleUpdatePass}>?????t l???i m???t kh???u</Button>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'rgb(16, 176, 16);', fontWeight: 'bold', color: 'white' }}>
                    {"?????t l???i m???t kh???u th??nh c??ng !"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className="dialog-message"> Gi??? ????y b???n c?? th??? s??? d???ng m???t kh???u m???i n??y ????? ????ng nh???p v??o h??? th???ng c???a VietSecond r???i !</p>
                        <p className="dialog-sig" ><i><b>Tr??n tr???ng,</b></i></p>
                        <p className="dialog-sig color"><i><b>VietSecond</b></i></p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => navigate('../login')} color="success" variant="contained" >????ng nh???p ngay</Button>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => navigate('../')} color="success" variant="contained" >V??? trang ch???</Button>
                </DialogActions>
            </Dialog>

        </div >
    );
}

export default UpdatePasswordForgot;