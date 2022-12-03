import './Product.css'
import ToggleButton from '@mui/material/ToggleButton';

const changeNameState = (state)=>{
    if(state==='SALE'){
        return 'Sản phẩm đang đăng bán'
    }
    else if(state==='EXCHANGE'){
        return 'Sản phẩm đăng trao đổi'
    }
    else if(state==='FREE'){
        return 'Sản phẩm cho tặng'
    }
    else{
        return 'Sản phẩm chưa đăng tin'
    }
}

function Product(props) {
    return (
        <ToggleButton size="small" className="inventory-product"value={true} onClick={()=>props.changeProductDetails()}>
            <img src={props.product.productImages[0].url}/>
            <div className="title">{props.product.productName}</div>
            <div className="state">{changeNameState(props.product.state)}</div>
        </ToggleButton>
    );
}


export default Product;