import './Cart.css'
import Button from '@mui/material/Button';

function CartEmpty(props) {
    return (
        <div className="cartempty-screen">
            <img src="https://cdn.discordapp.com/attachments/1009450253537247274/1031370541589868564/vietsecond.png"/>
            <p>Giỏ hàng của bạn đang trống , hãy tìm kiếm những món đồ yêu thích mua nào !</p>
            <Button onClick={() => props.navigateHome()} variant="contained">MUA NGAY</Button>
        </div>
    );
}

export default CartEmpty;