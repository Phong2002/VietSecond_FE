import './Post.css'
import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Category from './Category'
import Modal from '@mui/material/Modal';
import axios from 'axios'
import { URL_API } from '../../../api/Url'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListImage from './ListImage'
import {
    useNavigate
} from "react-router-dom";
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            allowLeadingZeros 
            thousandSeparator
            valueIsNumericString
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
function Post() {
    const navigate= useNavigate()

    const [categories, setCategories] = useState([])
    const [openModal, setOpenModal] = useState(true);
    const [categoryChoose, setCategoryChoose] = useState([])
    const [pathCategory, setPathCategory] = useState([])
    const [idCategory, setIdCategory] = useState('')
    const [stateProduct, setStateproduct] = useState("NEW")
    const [productName, setProductName] = useState("")
    const [productTitle, setProductTitle] = useState("")
    const [describe, setDescribe] = useState("")
    const [postType, setPostType] = useState('SALE')
    const [price, setPrice] = useState(0)
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [addressDetails, setAddressDetails] = useState('')

    const [messProductTitles, setMessProductTitles] = useState("")
    const [messProductName, setMessProductName] = useState("")
    const [messDescribe, setMessDescribe] = useState("")
    const [mess_province, setMess_province] = useState('')
    const [mess_district, setMess_district] = useState('')
    const [mess_ward, setMess_ward] = useState('')
    const [messPrice, setMessPrice] = useState('')
    const [messAddressDetails, setMessAddressDetails] = useState('')

    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])

    const [backdrop,setBackdrop] =useState(false)
    const [modalSuccess,setModalSuccess] = useState(false)
    const [listImageURL,setListImageURL] = useState([])

    const categoryName = () => {
        let name = '';
        for (let i = 0; i < categoryChoose.length; i++) {
            if (i != 0) {
                name += ' - ' + categoryChoose[i]
            }
            else {
                name += categoryChoose[i]
            }
        }
        return name
    }

    const handleChangeProductTitles = (value) => {
        setProductTitle(value)
        if (value.length == 0) {
            setMessProductTitles("Vui lòng điền tiêu đề")
        }
        else if (value.length < 3) {
            setMessProductTitles("Tiêu đề phải có ít nhât 3 kí tự trở lên")
        }
        else {
            setMessProductTitles("")
        }
    }

    const handleChangeProductName = (value) => {
        setProductName(value)
        if (value.length == 0) {
            setMessProductName("Vui lòng điền tên sản phẩm")
        }
        else {
            setMessProductName("")
        }
    }


    const handleChangePrice = (value) => {
        setPrice(value)
        if (value.length == 0) {
            setMessPrice("Bạn phải nhập giá tiền !")
        }
        else if (value < 1000) {
            setMessPrice("Quá rẻ ! ít cũng phải 1000 VNĐ trở lên")
        }
        else {
            setMessPrice("")
        }
    }

    const handleChangeDescribe = (value) => {
        setDescribe(value)

        if (value.length == 0) {
            setMessDescribe("Mô tả không được để trống")
        }
        else if (value.length < 10) {
            setMessDescribe("Mô tả phải có ít nhất 10 kí tự trở lên")
        }
        else {
            setMessDescribe("")
        }
    }


    const handleChangeAddressDetails = (value) => {
        setAddressDetails(value)

        if (value.length == 0) {
            setMessAddressDetails("Địa chỉ không được để trống")
        }
        else {
            setMessAddressDetails("")
        }
    }



    const handleClickButtonBackOnHeader = () => {
        let path = pathCategory.pop()
        fetchCategories(path)
        categoryChoose.pop()

    }

    const handleClickOutsideModal = () => {
        setCategoryChoose([])
        setPathCategory([])
        setIdCategory('')
        fetchCategories(0)
        setOpenModal(false)
    }

    const handleClickCategory = (category) => {
        if (category.level == categoryChoose.length) {
            categoryChoose.pop()
        }
        if (category.categories.length > 0) {
            setPathCategory([...pathCategory, (category.parentId ? category.parentId : 0)])
        }
        setIdCategory(category.id)
        setCategoryChoose([...categoryChoose, (category.categoryName)])
    }


    const handleChangeProvince = (value) => {
        setProvince(value);
        setProvince(value);
        setDistrict('');
        setWard('')
        console.log(province)
        getDistrict(value)
    }



    const handleChangeDistrict = (value) => {
        setDistrict(value);
        setWard('')
        getWard(value)

    }

    const handleChangeWard = (value) => {
        setWard(value)
        console.log(ward)
    }

    const clearData= ()=>{
        setPrice(0)
        setProvince("")
        setDistrict("")
        setWard("")
        setProductName("")
        setProductTitle("")
        setDescribe("")
        setAddressDetails("")
        setMessProductTitles("")
        setMessProductName("")
        setMessPrice("")
        setMessAddressDetails("")
        setListImageURL([])
    }

    const fetchCategories = (id) => {
        let config = {
            method: 'get',
            url: `${URL_API}category/${id}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log((response.data));
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getProvince = () => {

        let config = {
            method: 'get',
            url: `${URL_API}address/province`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListProvince(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getDistrict = (provincex) => {

        let config = {
            method: 'get',
            url: `${URL_API}address/district/${provincex}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListDistrict(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getWard = (districtx) => {

        let config = {
            method: 'get',
            url: `${URL_API}address/ward/${districtx}`,
            headers: {}
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
                setListWard(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDeleImage=(url)=>{
        const newLIistImage = listImageURL.filter((value)=>{
            return value !== url
        })
        setListImageURL(newLIistImage)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
    };

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            
            return
        }
     
        if(listImageURL.length<5){
            setListImageURL([...listImageURL,...e.target.files].slice(0, 5))
        }
    }   

    const postProduct = ()=>{
        setBackdrop(true)
        const FormData = require('form-data');
        let data = new FormData();
        listImageURL.forEach((value)=> data.append('files',value))
        data.append('categoryId', idCategory);
        data.append('usageStatus', stateProduct);
        data.append('productName', productName);
        data.append('state', postType);
        data.append('title', productTitle);
        data.append('describe', describe);
        data.append('price', price);
        data.append('addressId', ward);
        data.append('addressDetails', addressDetails);
        let config = {
          method: 'post',
          url: `${URL_API}post-product/new-product?`,
          headers: { 
            'Authorization': 'Bearer '+localStorage.getItem("TOKEN")
          },
          data : data
        };
        
        
        axios(config)
        .then((response) => {
            setBackdrop(false)
            clearData()
            setModalSuccess(true)
            
        })
        .catch((error) => {
            setBackdrop(false)
        });
    }
    const handlePostProduct= ()=>{
        postProduct();
    }
    useEffect(() => getProvince(), [])
    useEffect((() => fetchCategories(0)), [])
    return (
        <div className="post-screen">
            <div className="post-body">
                <div className="post-image">
                    <h4 style={{dispay:'block',textAlign:'center',margin:'10px'}}>Ảnh sản phẩm</h4>
                    <div>
                        <div className="total-image" style={listImageURL.length==5?{color:'red'}:{}}>Số lượng ảnh {listImageURL.length}/5</div>
                        <input type='file' onChange={onSelectFile} id="img" className='custom-file-input' name="img" accept="image/*" multiple/>
                        {selectedFile && <img src={preview} />}
                    </div>
                    <div className="post-list-image" style={{marginTop:'15px'}}>
                        {listImageURL.map((value)=>{
                            return <ListImage url={value} deleteImage = {()=>handleDeleImage(value)} />
                        })}
                    </div>
                   
                </div>

                <div className="post-infor">
                    <h4 style={{dispay:'block',textAlign:'center',margin:'10px'}}>Thông tin chi tiết</h4>
                    <div className="full-with">
                        <TextField
                            id="standard-read-only-input"
                            label="Danh mục sản phẩm đăng bán"
                            defaultValue="Chọn sản phẩm"
                            value={categoryName()}
                            onClick={() => setOpenModal(true)}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div style={categoryChoose.length > 0 ? { display: "block" } : { display: "none" }}>

                        <div className="full-with"> <TextField
                            error={messProductName}
                            id="outlined-error"
                            label="Tên sản phẩm"
                            value={productName}
                            onChange={e => handleChangeProductName(e.target.value)}
                            helperText={messProductName} />
                        </div>

                        <div className="full-with">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Mục đích đăng</InputLabel>
                                    <Select MenuProps={{ disableScrollLock: false }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postType}
                                        label="Mục đích đăng"
                                        onChange={event => setPostType(event.target.value)}
                                    >
                                        <MenuItem value={"SALE"}>Đăng bán</MenuItem>
                                        <MenuItem value={"EXCHANGE"}>Trao đổi</MenuItem>
                                        <MenuItem value={"FREE"}>Cho tặng</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </div>

                        <div className="full-with">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="state-product">Tình trạng</InputLabel>
                                    <Select MenuProps={{ disableScrollLock: false }}
                                        labelId="state-product"
                                        id="state-product"
                                        value={stateProduct}
                                        label="Tình trạng"
                                        onChange={event => setStateproduct(event.target.value)}
                                    >
                                        <MenuItem value={"NEW"}>Mới</MenuItem>
                                        <MenuItem value={"USED"}>Đã qua sử dụng</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className="full-with"> <TextField
                            error={messProductTitles}
                            id="outlined-error"
                            label="Tiêu đề"
                            value={productTitle}
                            onChange={e => handleChangeProductTitles(e.target.value)}
                            helperText={messProductTitles} />
                        </div>

                        <div className="full-with" style={{lineHeight: '195px'}}>   <TextField
                            error={messDescribe}
                            id="outlined-multiline-static"
                            label="Mô tả sản phẩm"
                            multiline
                            rows={6}
                            value={describe}
                            onChange={e => handleChangeDescribe(e.target.value)}
                            helperText={messDescribe}
                        />
                        </div>
                        <div style={{ marginTop: 20 }}></div>
                        <div className="full-with" style={postType === 'SALE' ? { display: "block" } : { display: "none" }} >
                            <TextField
                                error={messPrice ? true : false}
                                label="Giá tiền"
                                value={price}
                                onChange={e => { handleChangePrice(e.target.value) }}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                helperText={messPrice}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    startAdornment: <InputAdornment position="start">VNĐ</InputAdornment>,
                                }}

                            />
                        </div>

                        <h4 style={{ color: 'gray', margin: 10 }}>Địa chỉ</h4>
                        <div className="row-3">

                            <Box sx={{ width: 160, height: 40 }} >
                                <FormControl fullWidth size="small" error={mess_province}>
                                    <InputLabel id="province">Tỉnh/Thành phố</InputLabel>
                                    <Select
                                        labelId="province"
                                        id="province"
                                        value={province}
                                        label="Tỉnh/Thành phố"
                                        onChange={(e) => handleChangeProvince(e.target.value)}
                                    >
                                        {listProvince.map((province) => {
                                            return <MenuItem key={province.id} value={province.id}>{province.fullName}</MenuItem>
                                        })}
                                    </Select>
                                    <FormHelperText>{mess_province}</FormHelperText>
                                </FormControl>
                            </Box>

                            <Box sx={{ width: 160, height: 40 }} >
                                <FormControl fullWidth size="small" error={mess_district}>
                                    <InputLabel id="district">Quận/Huyện</InputLabel>
                                    <Select
                                        disabled={province ? false : true}
                                        labelId="district"
                                        id="district"
                                        value={district}
                                        label="Quận/Huyện"
                                        onChange={(e) => handleChangeDistrict(e.target.value)}
                                    >
                                        {listDistrict.map((district) => {
                                            return <MenuItem key={district.id} value={district.id}>{district.fullName}</MenuItem>
                                        })}
                                    </Select>
                                    <FormHelperText>{mess_district}</FormHelperText>
                                </FormControl>
                            </Box>

                            <Box sx={{ width: 160, height: 40 }} >
                                <FormControl fullWidth size="small" error={mess_ward}>
                                    <InputLabel id="ward">Phường/Xã</InputLabel>
                                    <Select
                                        disabled={district ? false : true}
                                        labelId="ward"
                                        id="ward"
                                        value={ward}
                                        label="Phường/Xã"
                                        onChange={(e) => handleChangeWard(e.target.value)}
                                    >
                                        {listWard.map((ward) => {
                                            return <MenuItem key={ward.id} value={ward.id}>{ward.fullName}</MenuItem>
                                        })}
                                    </Select>
                                    <FormHelperText>{mess_ward}</FormHelperText>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="full-with"> <TextField
                            error={messAddressDetails ? true : false}
                            id="outlined-error"
                            label="Địa chỉ chi tiết"
                            value={addressDetails}
                            onChange={e => handleChangeAddressDetails(e.target.value)}
                            helperText={messAddressDetails}
                            placeholder="Ghi rõ số nhà, đường, tổ, ..." />
                        </div>
                        <div className="button-submit">
                        <Button variant="contained" color="success" onClick={handlePostProduct}>Đăng tin</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category-modal">
                <Modal
                    open={openModal}
                    onClose={handleClickOutsideModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Category categories={categories} key={categories[0]} setCategories={setCategories}
                            closeModal={() => setOpenModal(false)} fetchCategories={fetchCategories}
                            handleClickCategory={handleClickCategory} handleClickButtonBackOnHeader={handleClickButtonBackOnHeader}
                            handleClickOutsideModal={handleClickOutsideModal}
                        ></Category>
                    </Box>
                </Modal>
            </div>
            <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog
                open={modalSuccess}
                onClose={() => setModalSuccess(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'rgb(16, 176, 16);', fontWeight: 'bold', color: 'white' }}>
                    {"Đăng tin thành công"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className="dialog-message"> Bài của bạn đã được đăng lên thành công ! bạn muốn tiếp tục đăng bài hay trở về trang chủ</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={()=>setModalSuccess(false)} color="success" variant="contained" >Tiếp tục đăng bài</Button>
                    <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => navigate('../')} color="success" variant="contained" >Về trang chủ</Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}

export default Post;