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
    const [dialog,setDialog] = useState(true)

    const handleChangePassword = (event) => {
        setMess_password("")
        setPassword(event.target.value);
        if (event.target.value && !validPassword.test(event.target.value)) {
            setMess_password("Phải có ít nhất 8 kí tự, trong đó có ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt!")
        }
    };

    const handleChangeConfirmPassword = (value) => {
        setMess_confirmPassword("")
        setConfirmPassword(value);
        if (value && !(password === value)) {
            setMess_confirmPassword("Mật khẩu nhập lại phải giống với mật khẩu đã nhập!")
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

        if (mess_password === "Trường này không được bỏ trống") {
            setMess_password("")
        }
        if (mess_confirmPassword === "Trường này không được bỏ trống") {
            setMess_confirmPassword("")
        }
        if (!password) {
            setMess_password("Trường này không được bỏ trống")
            result = false;
        }
        if (!confirmPassword) {
            setMess_confirmPassword("Trường này không được bỏ trống")
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
                <h1 className="update-pass-title">Đặt lại mật khẩu</h1>

                <div >

                    <FormControl sx={{ width: '100%' }} variant="outlined"
                        error={mess_password}

                    >
                        <InputLabel htmlFor="password">Mật khẩu</InputLabel>
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

                        <InputLabel htmlFor="confirm-password">Nhập lại mật khẩu</InputLabel>
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
                            label="Nhập lại mật khẩu"
                        />
                        <FormHelperText id="helper-text">{mess_confirmPassword}</FormHelperText>
                    </FormControl>
                </div>
                <Button sx={{ backgroundColor: '#3fbe56' }} color="success" variant="contained" onClick={handleUpdatePass}>Đặt lại mật khẩu</Button>
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
                    {"Đặt lại mật khẩu thành công !"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className="dialog-message"> Giờ đây bạn có thể sử dụng mật khẩu mới này để đăng nhập vào hệ thống của VietSecond rồi !</p>
                      
                       
                        <p className="dialog-sig" ><i><b>Trân trọng,</b></i></p>
                        <p className="dialog-sig color"><i><b>VietSecond</b></i></p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => navigate('../login')} color="success" variant="contained" >Đăng nhập ngay</Button>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => navigate('../')} color="success" variant="contained" >Về trang chủ</Button>
                </DialogActions>
            </Dialog>

        </div >
    );
}

export default UpdatePasswordForgot;