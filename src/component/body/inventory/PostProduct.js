import './Inventory.css'
import Button from '@mui/material/Button';
function PostProduct(props) {

    const date = new Date(props.postProductDto.postingTime)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className="post-product">
             <div className = "post-content">Tiêu đề : <p>{props.postProductDto.title}</p></div>
             <div className = "post-content">Giới thiệu : <p>{props.postProductDto.describe}</p></div>
             <div className = "post-content">Giá tiền : <p>{`${new Intl.NumberFormat('ja-JP').format(props.postProductDto.price)} VNĐ`} </p></div>
             <div className = "post-content">Ngày đăng : <p>{date.toLocaleDateString('vi-VI', options)}</p></div>
             <div className = "post-content">Địa chỉ : <p>{`${props.postProductDto.addressDetails} -${props.postProductDto.wardAddress} - 
             ${props.postProductDto.districtAddress} - ${props.postProductDto.provinceAddress}`}</p></div>
             <div className = "post-content-button">
                <Button variant="outlined" onClick={props.deleteProduct} style={{color: 'red',borderColor:"red"}}>Xóa sản phẩm </Button>
                <Button variant="outlined"  onClick={props.updateProduct} style={{color: 'orange',borderColor:"orange"}}>Chỉnh sửa </Button>
             </div>
             <div className = "view-my-post">
             <Button variant="outlined" color="success">Xem trong tin của tôi</Button>
             </div>
            
        </div>
    );
}
export default PostProduct;
