import './Login.css'
import React from 'react';
import { useState } from 'react'
import { URL_API } from '../../../api/Url.js'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/loginSlice.js'
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  useNavigate
} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
    } else if (value != "") {
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

class Buttonlg extends React.Component {
  render() {
    return (
      <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
        {this.props.buttonText}
      </div>
    );
  }
}

function Login() {
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [backdrop,setBackdrop] = useState(false)


  async function handleClick() {
    setMessage("");
    if (!password && !username) {
      setMessage("Vui lòng nhập tài khoản và mật khẩu ! ")
    }
    else if (!password) {
      setMessage("Vui lòng nhập mật khẩu !")
    }
    else if (!username) {
      setMessage("Vui lòng nhập tài khoản !")
    }
    else {
      setBackdrop(true)
      let data = JSON.stringify({
        "username": `${username}`,
        "password": `${password}`
      });

      let config = {
        method: 'post',
        url: `${URL_API}login`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then((response) => {
          setBackdrop(false)
          console.log(response.data);

          localStorage.setItem('NAME', response.data.fullname);
          localStorage.setItem('ROLE', response.data.role);
          localStorage.setItem('TOKEN', response.data.jwt);
          localStorage.setItem('BALANCE', response.data.accountBalance);
          localStorage.setItem('URL_AVATAR', response.data.urlAvatar);
          dispatch(login())
          navigate("../")
        })
        .catch((error) => {
          if (error.response.status == 401) {
            setMessage("Sai tài khoản hoặc mật khẩu")
          }
          setBackdrop(false)
        });
    }
  }

  const style = {
    margin: "20px 0"
  };
  return (
    <div className="login-container">
      <AccountCircleIcon sx={{ fontSize: 200, color: '#3fbe56' }} />
      <FluidInput type="text" label="Tài khoản" id="name" style={style} onChange={setUsername} value={username} />
      <FluidInput type="password" label="Mật khẩu" id="password" style={style} onChange={setPassword} value={password} />
      <p className={`message-login ${message ? "" : "padding-22"}`}>{message}</p>
      <Buttonlg buttonText="Đăng nhập" buttonClass="login-button" onClick={() => handleClick()} />
      <div className="forgotPassword" onClick={() => navigate("/forgot-password")}>Quên mật khẩu ?</div>
      <div className="signin"><Button variant="outlined" color="success" onClick={() => navigate("/register")}>Tạo tài khoản</Button> </div>
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}



export default Login;