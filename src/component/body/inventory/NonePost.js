import './Inventory.css'
import Button from '@mui/material/Button';

function NonePost(props) {
    

    return (
        <div className="none-post-container">
           <div className="row-2">
           <Button variant="outlined" onClick={props.deleteProduct} style={{color: 'red',borderColor:"red"}}>Xóa sản phẩm </Button>
            <Button variant="outlined" style={{color: 'orange',borderColor:"orange"}} onClick={props.updateProduct}>Chỉnh sửa </Button>
           </div>
           <Button variant="outlined" color ="success" onClick={props.updateProduct}>Đăng tin sản phẩm này</Button>
        </div>
    );
}

export default NonePost;