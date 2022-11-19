import './Header.css'
import Button from '@mui/material/Button';
function SubButtonUser(props) {
    return (
        <div className="sub-button-user">
            <ul>
                <li>
                    <Button>Trang cá nhân</Button>
                </li>
                <li>
                    <Button>Đóng góp ý kiến</Button>
                </li>
                <li>
                    <Button onClick={props.LogOut}>Đăng xuất</Button>
                </li>
            </ul>
        </div>
    );
}

export default SubButtonUser;
  