import './FullScreen.css'
import Header from '../header/Header.js'
import {Outlet} from 'react-router-dom';

function FullScreen() {
    return (
        <div className="fullScreen">
            <Outlet/>
        </div>
    );
}

export default FullScreen;
  