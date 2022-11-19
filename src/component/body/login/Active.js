import './Active.css'
import { useLocation,useParams } from "react-router-dom"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useState,useEffect} from 'react'
import { URL_API } from '../../../api/Url'
import {
    useNavigate
} from "react-router-dom";
import axios from "axios"

function Active() {
    const [state,setState]=useState(0)
    const location = useLocation();
    let navigate = useNavigate();
    const params = useParams();
    const handleGoToLogin = () => {
        navigate('../../login')
    }


    const handleActive = () => {

        let config = {
            method: 'get',
            url: `${URL_API}user/verification/${params.token}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                setState(1)
            })
            .catch((error) => {
                setState(2)
            });

    }

    const activeSuccess = () => {
        return <div className="activeSuccess">
            <div class="pyro"><div class="before"></div><div class="after"></div></div>
            <CheckCircleOutlineIcon sx={{ fontSize: 200, color: '#3fbe56' }} />
            <h1>Kích hoạt tài khoản thành công!</h1>
            <div className="activeSuccess-content">Giờ đây bạn có thể sử dụng tài khoản này để đăng nhập vào hệ thống của VietSecond</div>
            <Button sx={{ backgroundColor: '#3fbe56', height: 60, fontSize: 20 }} color="success" variant="contained" onClick={handleGoToLogin}>Đăng nhập ngay</Button>
        </div>
    }

    const activeFails = () => {
        return <div className="activeSuccess">
            <HighlightOffIcon sx={{ fontSize: 200, color: 'red' }} />
            <h1 style={{ color: 'red' }}>Kích hoạt tài khoản thất bại!</h1>
            <div className="activeSuccess-content">Có thể tài khoản của bạn đã được kích hoạt trước đó hoặc token này không tồn tại</div>
            <Button sx={{ height: 60, fontSize: 20 }} color="error" variant="contained" onClick={() => navigate('../../')}>Quay lại trang chủ</Button>
        </div>
    }

    const showResults = () =>{
        if(state===0){
            return <></>
        }
        else if(state===1){
            return activeSuccess()
        }
        else if(state===2){
            return activeFails()
        }
    }

    useEffect(()=>handleActive(),[])

    return (
        <div className="active">
            {showResults()}
        </div>
    );
}

export default Active;