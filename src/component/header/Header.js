import './Header.css'
import { useState } from 'react'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LuggageIcon from '@mui/icons-material/Luggage';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlagIcon from '@mui/icons-material/Flag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Notification from '../body/notification/Notification.js'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {
    useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {logout,selectStateLogin} from '../../redux/loginSlice'
import SubButtonUser from './SubButtonUser.js'


function Header() {
    const dispatch = useDispatch();
    const [nav, setNav] = useState('')
    const [isOpenNoti, setIsOpenNoti] = useState(false)
    let navigate = useNavigate();
    const isLogin = useSelector(selectStateLogin)
    const [isOpenSubMenuUser, setOpenSubMenuUser] = useState(false)

    const handleLogOut = ()=>{
       dispatch(logout());
       setOpenSubMenuUser(false);
       localStorage.removeItem("NAME");
       localStorage.removeItem("ROLE");
       localStorage.removeItem("TOKEN");
       localStorage.removeItem("BALANCE");
       localStorage.removeItem("URL_AVATAR");
    }

    return (
        <div className="screen">
            <div className="container">
                <div className="logo">
                    <img
                        src="https://cdn.discordapp.com/attachments/1009450253537247274/1031370541375955034/vietsecond.jpg"></img>
                </div>
                <div className="nav-container">
                    
                    <div className="nav">
                        <ul>
                            <li><Button startIcon={<HomeIcon />} onClick={() => navigate("/")}>Trang chủ</Button></li>
                            <li></li>
                            <li></li>
                            <li><Button startIcon={<FlagIcon />} onClick={() => navigate("/news")}disabled={!isLogin}>Tin của tôi</Button>
                            </li>
                            <li className="noti">
                                <ClickAwayListener onClickAway={() => setIsOpenNoti(false)}>
                                    <Box><Button startIcon={<NotificationsIcon />}
                                        onClick={() => setIsOpenNoti(!isOpenNoti)} disabled={!isLogin}>Thông báo</Button>
                                        {isOpenNoti ? <Notification /> : null}</Box>
                                </ClickAwayListener>
                            </li>
                            <li><Button startIcon={<EmailIcon />} onClick={() => navigate("/chat")}disabled={!isLogin}>Tin nhắn</Button>
                            </li>
                        </ul>
                    </div>
                    <div className="sub-nav">
                    <Button startIcon={<LuggageIcon />} onClick={() => navigate("/inventory")} disabled={!isLogin}>Kho
                                đồ</Button>
                                <Button startIcon={<ShoppingBagIcon />} onClick={() => navigate("/order")}disabled={!isLogin}>Đơn
                                hàng</Button>
                        <div className="cash">
                            <Button startIcon={<ShoppingCartIcon />} onClick={() => navigate("/cart")}disabled={!isLogin}>Giỏ hàng</Button>
                        </div>
                        <div className="post">
                            <Button variant="contained" startIcon={<PostAddIcon />} color="secondary"
                                onClick={() => navigate("/post")}disabled={!isLogin}>Đăng tin</Button>
                        </div>
                    </div>
                </div>
                <div className="user">
                    {!isLogin ? <Button variant="contained" startIcon={<AccountCircleIcon />} onClick={() => navigate("/login")}>Đăng nhập</Button> :

                        <div className="user-container">
                            <Avatar alt={localStorage.getItem('NAME').split(' ').slice(-1).join(' ')} src={localStorage.getItem("URL_AVATAR")}
                                sx={{ width: 45, height: 45 }} />

                            <ClickAwayListener onClickAway={() => setOpenSubMenuUser(false)}>
                                <Box><Button
                                    onClick={() => setOpenSubMenuUser(!isOpenSubMenuUser)} className="fullname">{localStorage.getItem("NAME")}</Button>
                                    {isOpenSubMenuUser ? <SubButtonUser LogOut={handleLogOut}/> : null}</Box>
                            </ClickAwayListener>
                        </div>
                    }
                </div>
            </div>
            <div className="body">
                <Outlet />
            </div>
            <div className="footer">footer</div>
        </div>
    );
}

export default Header;

