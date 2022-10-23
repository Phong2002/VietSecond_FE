import './App.css';
import Header from './component/header/Header.js'
import FullScreen from './component/fullScreen/FullScreen.js'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './component/body/home/Home.js'
import Cart from './component/body/cart/Cart.js'
import Order from './component/body/order/Order.js'
import Chat from './component/body/chat/Chat';
import Inventory from './component/body/inventory/Inventory.js'
import Post from './component/body/post/Post.js'
import Error from './component/error/Error.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<FullScreen />}>
          <Route path="" element={<Header />}>
            <Route path="" element={<Home />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="order" element={<Order />}></Route>
            <Route path="chat" element={<Chat />}></Route>
            <Route path="inventory" element={<Inventory />}></Route>
            <Route path="post" element={<Post />}></Route>
          </Route>
        </Route>
        <Route path="error" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
