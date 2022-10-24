import './Cart.css'
import CartEmpty from './CartEmpty';
import {
    useNavigate
} from "react-router-dom";

function Cart() {
    let navigate = useNavigate();


    return (
      <div className="cart-screen">
       <CartEmpty navigateHome={() => navigate("/")} />
       
      </div>
    );
  }
  
  export default Cart;