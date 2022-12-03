import './Post.css'
import { red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
function ListImage(props) {
    

    return (
        <div className="list-image-post">
            <img src={URL.createObjectURL(props.url)}></img>
            {console.log(URL.createObjectURL(props.url))}
            <div className="delete-image-post" onClick={props.deleteImage}><CancelIcon sx={{ fontSize: 26 ,color: red[500]}} ></CancelIcon></div>
        </div>
    );
}

export default ListImage;