import './Inventory.css'
import { useState, useEffect } from 'react'
import Product from './Product.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PostProduct from './PostProduct.js'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import UpdateInforProduct from './UpdateInforProduct.js'
import { URL_API } from '../../../api/Url'
import axios from 'axios'
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import NonePost from './NonePost';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CreateNewProduct from './CreateNewProduct.js'
import {
    useNavigate
} from "react-router-dom";
import Slide from '@mui/material/Slide';
import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, right: '-4px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, left: '-14px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}

const changeNameState = (state) => {
    if (state === 'SALE') {
        return 'Sản phẩm đang đăng bán'
    }
    else if (state === 'EXCHANGE') {
        return 'Sản phẩm đăng trao đổi'
    }
    else if (state === 'FREE') {
        return 'Sản phẩm cho tặng'
    }
    else if (state === 'NONE') {
        return 'Chưa đăng tin'
    }
}

function Inventory() {
    const navigate = useNavigate()

    const [inventory, setInventory] = useState([])
    const [isLoadInventory, setIsLoadInventory] = useState(false)
    const [productDetails, setProducDetails] = useState([])
    const [productIndex, setProductIndex] = useState(0)
    const [search, setSearch] = useState('')
    const [usageStatus, setUsageStatus] = useState('')
    const [state, setState] = useState('')
    const [newProductDialog, setNewProductDialog] = useState(false);

    const [totalPages, setTotalPages] = useState(1)
    const [paging, setPaging] = useState(1)

    const handleChangeProductDetails = (index) => {
        setProductIndex(index)
        setProducDetails(inventory[index])
    }

    const fetchDataInventory = () => {
        setIsLoadInventory(true)
        let where = '';

        where += (paging ? (where ? "&" : "?") + "page=" + paging + "&size=9" : "");

        where += (search ? (where ? "&" : "?") + "search=" + search : "");

        if (state !== '' && where !== '') {
            where += '&state=' + state
        }
        else if (state != '' && where === '') {
            where += '?state=' + state
        }

        if (usageStatus !== '' && where !== '') {
            where += '&usageStatus=' + usageStatus
        }
        else if (usageStatus != '' && where === '') {
            where += '?usageStatus=' + usageStatus
        }

        let config = {
            method: 'get',
            url: `${URL_API}product/inventory` + where,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        };

        axios(config)
            .then((response) => {
                setTotalPages(response.data.totalPages)
                setInventory(response.data.content)
                if (response.data.content.length > productIndex) {
                    setProducDetails(response.data.content[productIndex])
                }
                else
                    setProducDetails(response.data.content[response.data.content.length - 1])
                setIsLoadInventory(false)
            })
            .catch((error) => {
                setIsLoadInventory(false)
            });
    }


    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const [backdrop, setBackdrop] = useState(false)
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogUpdate, setDialogUpdate] = useState(false)

    const deleteProduct = () => {
        setDialogDelete(false)
        setBackdrop(true)

        let config = {
            method: 'delete',
            url: `${URL_API}product/delete/${productDetails.productId}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        };

        axios(config)
            .then((response) => {
             toastSuccess("Xóa sản phẩm thành công")

                setBackdrop(false)
                fetchDataInventory()
            })
            .catch((error) => {
             toastError("Xóa sản phẩm thất bại")
                setBackdrop(false)
            });


    }

    const handleDeletePostProduct = (postID) => {
        setDialogUpdate(false)
        setBackdrop(true)

        let config = {
            method: 'delete',
            url: `${URL_API}post-product/delete/${postID}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
            }
        };

        axios(config)
            .then((response) => {
                toastSuccess("Xóa bài đăng thành công!")
                setBackdrop(false)
                fetchDataInventory()
            })
            .catch((error) => {
                toastError("Xóa bài đăng thất bại!")
                setBackdrop(false)
            });

    }

    const toastError = (mess)=>{
        toast.error(mess, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const toastSuccess = (mess)=>{
        toast.success(mess, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    useEffect(fetchDataInventory, [])
    useEffect(fetchDataInventory, [usageStatus])
    useEffect(fetchDataInventory, [state])
    useEffect(fetchDataInventory, [paging])

    return (
        <div className="inventory-screen">
            <div className="inventory-head">

                <div className="search">
                    <div className="input-search border-search">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={"Tìm kiếm ..."} />
                        <div ><SearchIcon onClick={() => { fetchDataInventory() }} sx={{ fontSize: 30 }} /></div>
                    </div>
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-simple-select-helper-label">Tình trạng sản phẩm</InputLabel>
                        <Select
                            labelId="select-usage-status"
                            id="select-usage-status"
                            value={usageStatus}
                            label="Tình trạng sản phẩm"
                            onChange={e => setUsageStatus(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Tất cả</em>
                            </MenuItem>
                            <MenuItem value={"NEW"}>Mới</MenuItem>
                            <MenuItem value={"USED"}>Đã qua sử dụng</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>       <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">Trạng thái sản phẩm</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={state}
                        label="Trạng thái sản phẩm"
                        onChange={e => setState(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        <MenuItem value={"NONE"}>Chưa đăng tin</MenuItem>
                        <MenuItem value={"SALE"}>Đăng bán</MenuItem>
                        <MenuItem value={"EXCHANGE"}>Trao đổi</MenuItem>
                        <MenuItem value={"FREE"}>Cho tặng</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <Button color="success" variant="outlined" onClick={() => setNewProductDialog(true)} startIcon={<AddIcon />} >Thêm sản phẩm</Button>
            </div>
            {isLoadInventory ? <div className="is-loading"><CircularProgress /></div> :
                inventory.length == 0 ? "Ban chua mua gi ca" : <>
                    <div className="inventory-body">
                        <div className="product-list">
                            <div className="list-product">
                                {inventory.map((value, index) => { return <Product product={value} key={value.productId} changeProductDetails={() => handleChangeProductDetails(index)} /> })}
                            </div>
                            <div className="paging">   <Pagination count={totalPages} defaultPage={paging} showFirstButton showLastButton onChange={(e, v) => { setPaging(v) }} variant="outlined" color="primary" /></div>
                        </div>
                        <div className="product-details" key={productDetails}>
                            <div className="slider-image-product-details">
                                <Slider  {...settings}>
                                    {productDetails.productImages.map((value) => { return <img className='product-image-print' key={value.url} src={value.url}></img> })}
                                </Slider>
                            </div>
                            <div className='infor-product'>
                                <div className="post-content">Tên sản phẩm : <p>{productDetails.productName}</p></div>
                                <div className="post-content">Trạng thái sản phẩm : <p>{changeNameState(productDetails.state)}</p></div>
                                <div className="post-content">Tình trạng : <p>{productDetails.usageStatus === 'NEW' ? "Mới" : "Đã qua sử dụng"}</p></div>
                                <div className="post-content">Danh mục sản phẩm : <p>{productDetails.category}</p></div>
                            </div>
                            <div className="infor-post">
                                {productDetails.postProductDto ?
                                    <PostProduct deleteProduct={() => setDialogDelete(true)} updateProduct={() => setDialogUpdate(true)} postProductDto={productDetails.postProductDto} />
                                    :
                                    <NonePost deleteProduct={() => setDialogDelete(true)} updateProduct={''} />}

                            </div>
                        </div>
                    </div>

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}
                    >
                        <CircularProgress />
                    </Backdrop>

                    <Dialog
                        TransitionComponent={Transition}
                        open={dialogDelete}
                        onClose={() => setDialogDelete(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'red', fontWeight: 'bold', color: 'white' }}>
                            {"Xóa sản phẩm"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <p className="dialog-message">Bạn có chắc chắn muốn xóa sản phẩm : {productDetails.productName} không</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={() => deleteProduct()} variant="contained" >Xóa</Button>
                            <Button onClick={() => setDialogDelete(false)} variant="contained" >Không</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        TransitionComponent={Transition}
                        open={dialogUpdate}
                        onClose={() => setDialogUpdate(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        maxWidth={'lg'}

                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color: 'green' }}>
                            {"Chỉnh sửa thông tin sản phẩm"}
                        </DialogTitle>
                        <DialogContent>
                            <UpdateInforProduct refreshData={fetchDataInventory} deletePostProduct={handleDeletePostProduct} closeDialog={() => setDialogUpdate(false)} product={productDetails} />
                        </DialogContent>

                    </Dialog></>}
            <ToastContainer
            />
            {/* Same as */}
            <ToastContainer />

            <Dialog
                TransitionComponent={Transition}
                open={newProductDialog}
                onClose={() => setNewProductDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'lg'}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color: 'green' }}>
                    {"Thêm sản phẩm"}
                </DialogTitle>
                <DialogContent>
                    <CreateNewProduct toastSuccess={toastSuccess} toastError={toastError} setBackdrop={setBackdrop} refreshData={fetchDataInventory} closeDialog={() => setNewProductDialog(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default Inventory;