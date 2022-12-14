import './Register.css'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import viLocale from 'date-fns/locale/vi';
import { URL_API } from '../../../api/Url'
import { validEmail, validPhoneNumber, validPassword } from '../../../validator/validate'
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState(new Date())
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [confirmPassword, setConfirmPassword] = useState('')
    const [backdrop,setBackdrop] = useState(false)
   

    const [mess_first_name, setMess_first_name] = useState('')
    const [mess_last_name, setMess_last_name] = useState('')
    const [mess_gender, setMess_gender] = useState('')
    const [mess_birthday, setMess_birthday] = useState('')
    const [mess_email, setMess_email] = useState('')
    const [mess_phoneNumber, setMess_phoneNumber] = useState('')
    const [mess_username, setMess_username] = useState('')
    const [mess_password, setMess_password] = useState('')
    const [mess_confirmPassword, setMess_confirmPassword] = useState('')
    const [mess_province, setMess_province] = useState('')
    const [mess_district, setMess_district] = useState('')
    const [mess_ward, setMess_ward] = useState('')
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

    const handleChangePhoneNumber = (value) => {
        setMess_phoneNumber("")
        setPhoneNumber(value);
        if (value && !validPhoneNumber.test(value)) {
            setMess_phoneNumber("S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng!")
        }
    }

    const handleChangeEmail = (value) => {
        setMess_email("")
        setEmail(value);
        if (value && !validEmail.test(value)) {
            setMess_email("Email kh??ng ????ng ?????nh d???ng!")
        }
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeProvince = (value) => {
        setProvince(value);
        setProvince(value);
        setDistrict('');
        setWard('')
        console.log(province)
        getDistrict(value)
    }

    const handleChangeDistrict = (value) => {
        setDistrict(value);
        setWard('')
        getWard(value)
        
    }

    const handleChangeWard =(value)=>{
        setWard(value)
        console.log(ward)
    }

    const validate = () => {
        let result = true;
        if(!mess_first_name||!mess_last_name||!mess_gender||!mess_phoneNumber||!mess_email||!mess_province
            ||!mess_district||!mess_ward||!mess_username||!mess_password||!mess_confirmPassword){
                result = false;}
        if(mess_first_name==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_first_name("")
        }
        if(mess_last_name==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_last_name("")
        }
        if(mess_gender==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_gender("")
        }
        if(mess_phoneNumber==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_phoneNumber("")
        }
        if(mess_email==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_email("")
        }
        if(mess_province==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_province("")
        }
        if(mess_district==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_district("")
        }
        if(mess_ward==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_ward("")
        }
         if(mess_username==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_username("")
        }
        if(mess_password==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_password("")
        }
        if(mess_confirmPassword==="Tr?????ng n??y kh??ng ???????c b??? tr???ng"){
            setMess_confirmPassword("")
        }

        if (!firstName) {
            setMess_first_name("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!lastName) {
            setMess_last_name("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!gender) {
            setMess_gender("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!phoneNumber) {
            setMess_phoneNumber("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!email) {
            setMess_email("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!province) {
            setMess_province("Kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!district) {
            setMess_district("Kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!ward) {
            setMess_ward("Kh??ng ???????c b??? tr???ng")
            result = false;
        }
        if (!username) {
            setMess_username("Tr?????ng n??y kh??ng ???????c b??? tr???ng")
            result = false;
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

    const getProvince = () => {

        let config = {
            method: 'get',
            url: `${URL_API}address/province`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListProvince(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getDistrict = (provincex) => {

        let config = {
            method: 'get',
            url: `${URL_API}address/district/${provincex}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListDistrict(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getWard = (districtx) => {

        let config = {
            method: 'get',
            url: `${URL_API}address/ward/${districtx}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListWard(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const register = () => {
        setBackdrop(true)
        
        let data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "gender": gender,
            "address": ward,
            "dateOfBirth": `${birthday.getYear() + 1900}-${birthday.getMonth() >= 10 ? birthday.getMonth() + 1 : "0" + (birthday.getMonth() + 1)}-${birthday.getDate() >= 10 ? birthday.getDate() : "0" + birthday.getDate()}`,
            "phoneNumber": phoneNumber,
            "email": email,
            "username":username,
            "password": password
        });

        let config = {
            method: 'post',
            url: URL_API+'register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                setDialog(true)
                setBackdrop(false)
            })
            .catch((error) => {
                console.log(error);
                if(error.response.data.statusCode==400){
                    if(error.response.data.message=="email is exists!"){
                        setMess_email("Email n??y ???? ???????c ????ng k?? !")
                    }
                    else if(error.response.data.message=="username is exists!"){
                        setMess_username("T??n t??i kho???n n??y ???? ???????c s??? d???ng !")
                    }
                    else if(error.response.data.message=="phone number is exists!"){
                        setMess_phoneNumber("S??? ??i???n tho???i n??y ???? ???????c ????ng k?? !")
                    }
                }

                setBackdrop(false)
            });

    }

    const hanleRegister = ()=>{
        if(validate()) {
            register();
        }
    }

    useEffect(() => getProvince(), [])


    return (
        <div className="Register">
            <div className="Register-container">
                <div className="Register-container-header">
                    <div className="Register-container-header-title">
                        <h2>????ng k??</h2>
                        <p>T???o t??i kho???n VietSecond ngay</p>
                    </div>
                    <img src="https://cdn.discordapp.com/attachments/1009450253537247274/1031370541589868564/vietsecond.png" />
                </div>
                <div className="Register-container-body">
                    <div className="row-2">
                        <TextField
                            error={mess_first_name}
                            id="lastName"
                            label="H??? v?? t??n ?????m"
                            size="small"
                            maxRows={1}
                            value={firstName}
                            helperText={mess_first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            error={mess_last_name}
                            id="firstName"
                            label="T??n"
                            size="small"
                            maxRows={1}
                            value={lastName}
                            helperText={mess_last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="row-2">
                        <Box sx={{ width: 222, height: 40 }} >
                            <FormControl fullWidth size="small" error={mess_gender ? true : false}>
                                <InputLabel id="gender">Gi???i t??nh</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender-select"
                                    value={gender}
                                    label="Gi???i t??nh"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value={'MALE'}>Nam</MenuItem>
                                    <MenuItem value={'FEMALE'}>N???</MenuItem>
                                    <MenuItem value={'UNKNOWN'}>Kh??c</MenuItem>
                                </Select>
                                <FormHelperText>{mess_gender}</FormHelperText>
                            </FormControl>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale} >
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                label="Ng??y sinh"
                                maxDate={new Date().setMonth(new Date().getMonth())}
                                value={birthday}
                                onChange={(newValue) => {
                                    setBirthday(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="row-2">
                        <TextField
                            error={mess_phoneNumber}
                            id="phonenumber"
                            label="S??? ??i???n tho???i"
                            size="small"
                            maxRows={1}
                            value={phoneNumber}
                            helperText={mess_phoneNumber}
                            onChange={(e) => handleChangePhoneNumber(e.target.value)}
                        />
                        <TextField
                            error={mess_email}
                            id="email"
                            label="Email"
                            size="small"
                            maxRows={1}
                            value={email}
                            helperText={mess_email}
                            onChange={(e) => handleChangeEmail(e.target.value)}
                        />
                    </div>
                    <div className="row-3">
                        <Box sx={{ width: 160, height: 40 }} >
                            <FormControl fullWidth size="small" error={mess_province}>
                                <InputLabel id="province">T???nh/Th??nh ph???</InputLabel>
                                <Select
                                    labelId="province"
                                    id="province"
                                    value={province}
                                    label="T???nh/Th??nh ph???"
                                    onChange={(e) => handleChangeProvince(e.target.value)}
                                >
                                    {listProvince.map((province) => {
                                        return <MenuItem key={province.id} value={province.id}>{province.fullName}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{mess_province}</FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx={{ width: 160, height: 40 }} >
                            <FormControl fullWidth size="small" error={mess_district}>
                                <InputLabel id="district">Qu???n/Huy???n</InputLabel>
                                <Select
                                    disabled={province ? false : true}
                                    labelId="district"
                                    id="district"
                                    value={district}
                                    label="Qu???n/Huy???n"
                                    onChange={(e) => handleChangeDistrict(e.target.value)}
                                >
                                    {listDistrict.map((district) => {
                                        return <MenuItem key={district.id} value={district.id}>{district.fullName}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{mess_district}</FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx={{ width: 160, height: 40 }} >
                            <FormControl fullWidth size="small" error={mess_ward}>
                                <InputLabel id="ward">Ph?????ng/X??</InputLabel>
                                <Select
                                    disabled={district ? false : true}
                                    labelId="ward"
                                    id="ward"
                                    value={ward}
                                    label="Ph?????ng/X??"
                                    onChange={(e) => handleChangeWard(e.target.value)}
                                >
                                    {listWard.map((ward) => {
                                        return <MenuItem key={ward.id} value={ward.id}>{ward.fullName}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{mess_ward}</FormHelperText>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="row-1">
                        <TextField
                            error={mess_username}
                            id="username"
                            label="T??n t??i kho???n"
                            sx={{ width: '100%', height: 20 }}
                            maxRows={1}
                            value={username}
                            helperText={mess_username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="row-1" >

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

                    <div className="row-1" >

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
                </div>
                <Button sx={{ backgroundColor: '#3fbe56' }} color="success" variant="contained" onClick={hanleRegister}>T???o t??i kho???n</Button>
            </div>
            <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Dialog
        open={dialog}
        onClose={()=>setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:'rgb(16, 176, 16);',fontWeight:'bold',color:'white'}}>
          {"T???o t??i kho???n th??nh c??ng !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="dialog-message"> C???m ??n b???n ???? ????ng k?? t??i kho???n c???a VietSecond. ????? s??? d???ng t??i kho???n n??y b???n vui l??ng x??c th???c trong email ???? ????ng k?? c???a m??nh !</p> 
            <p className="dialog-sig" ><i><b>Tr??n tr???ng,</b></i></p>
            <p className="dialog-sig color"><i><b>VietSecond</b></i></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default Register;