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
import Home from '../body/Home/Home.js'


function Header() {
    const [nav, setNav] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [placeholder, setPlaceholder] = useState('Tất cả danh mục')
    return (
        <div className="screen">
        <div className="container">
            <div className="logo">
                <img src="https://cdn.discordapp.com/attachments/1009450253537247274/1031370541375955034/vietsecond.jpg" ></img>
            </div>
            <div className="nav-container">
                <div className="nav">
                    <ul>
                        <li><Button startIcon={<HomeIcon />}>Trang chủ</Button></li>
                        <li><Button startIcon={<LuggageIcon />}>Kho đồ</Button></li>
                        <li><Button startIcon={<ShoppingBagIcon />}>Đơn hàng</Button></li>
                        <li><Button startIcon={<FlagIcon />}>Tin của tôi</Button></li>
                        <li><Button startIcon={<NotificationsIcon />}>Thông báo</Button></li>
                        <li><Button startIcon={<EmailIcon />}>Tin nhắn</Button></li>
                    </ul>
                </div>

                <div className="sub-nav">
                    <div className="search">
                        <div className="input-search">
                            <input type="text" value={inputSearch} onChange={e => setInputSearch(e.target.value)} placeholder={placeholder} />
                            <div><SearchIcon sx={{ fontSize: 30 }} /></div>
                        </div>
                    </div>

                    <div className="cash">
                        <Button startIcon={<ShoppingCartIcon />}>Giỏ hàng</Button>
                    </div>

                    <div className="post">
                        <Button variant="contained"startIcon={<PostAddIcon />}  color="secondary" >Đăng tin</Button>
                    </div>
                </div>


            </div>

            <div className="user">
            <Button variant="contained"startIcon={<AccountCircleIcon />} >Đăng nhập</Button>
            </div>
        </div>
            <Home/>
        </div>
    );
}

export default Header;
