import { useState, useEffect } from 'react'
import ListImage from './ListImage';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import * as React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { URL_API } from '../../../api/Url.js'
import axios from 'axios'
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

function UpdateInforProduct(props) {
    const [backdrop, setBackdrop] = useState(false)
    const [listImage, setListImage] = useState([...props.product.productImages]);
    const [oldImage, setOldImage] = useState([...props.product.productImages]);
    const [newImage, setNewImage] = useState([]);
    const [listImageDelete, setListImageDelete] = useState([]);

    const [productName, setProductName] = useState([props.product.productName])
    const [productTitle, setProductTitle] = useState(props.product.postProductDto!==null?props.product.postProductDto.title:'')
    const [describe, setDescribe] = useState(props.product.postProductDto!==null?props.product.postProductDto.describe:'')
    const [price, setPrice] = useState(props.product.postProductDto!==null?props.product.postProductDto.price:'')

    const [messProductTitles, setMessProductTitles] = useState("")
    const [messProductName, setMessProductName] = useState("")
    const [messDescribe, setMessDescribe] = useState("")
    const [messPrice, setMessPrice] = useState('')

    const handleDeleteImage = (image) => {
        if (oldImage.includes(image)) {
            setListImageDelete([...listImageDelete, image])
        }
        setListImage(listImage.filter((value) => { return value !== image }))
        setOldImage(oldImage.filter((value) => { return value !== image }))
        setNewImage(newImage.filter((value) => { return value !== image }))
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        if (listImage.length < 5) {
            const image = {
                "id": listImage.length,
                "url": e.target.files[0],
                "isLocal": true
            }
            setListImage([...listImage, image].slice(0, 5))
            setNewImage([...newImage, image].slice(0, 5))
        }
    }

    const handleChangeProductTitles = (value) => {
        setProductTitle(value)
        if (value.length == 0) {
            setMessProductTitles("Vui l??ng ??i???n ti??u ?????")
        }
        else if (value.length < 3) {
            setMessProductTitles("Ti??u ????? ph???i c?? ??t nh??t 3 k?? t??? tr??? l??n")
        }
        else {
            setMessProductTitles("")
        }
    }

    const handleChangeProductName = (value) => {
        setProductName(value)
        if (value.length == 0) {
            setMessProductName("Vui l??ng ??i???n t??n s???n ph???m")
        }
        else {
            setMessProductName("")
        }
    }


    const handleChangePrice = (value) => {
        setPrice(value)
        if (value.length == 0) {
            setMessPrice("B???n ph???i nh???p gi?? ti???n !")
        }
        else if (value < 1000) {
            setMessPrice("Qu?? r??? ! ??t c??ng ph???i 1000 VN?? tr??? l??n")
        }
        else {
            setMessPrice("")
        }
    }

    const handleChangeDescribe = (value) => {
        setDescribe(value)

        if (value.length == 0) {
            setMessDescribe("M?? t??? kh??ng ???????c ????? tr???ng")
        }
        else if (value.length < 10) {
            setMessDescribe("M?? t??? ph???i c?? ??t nh???t 10 k?? t??? tr??? l??n")
        }
        else {
            setMessDescribe("")
        }
    }

    const updateInfor = () => {
        const id = toast.loading("?????i x??u b???n nh?? ...")
        setBackdrop(true)
        const FormData = require('form-data');
        let data = new FormData();
        newImage.forEach((value) => data.append('files', value.url))
        listImageDelete.forEach((value) => data.append('deleteUrlImageList', value.url))

        data.append('productId', props.product.productId);
        data.append('productName', productName);
        data.append('postTitle', productTitle);
        data.append('postDescribe', describe);
        data.append('postPrice', price);

        let config = {
            method: 'put',
            url: `${URL_API}post-product/update`,
            headers: {
            },
            data: data
        };

        axios(config)
            .then((response) => {
                toast.update(id, { render: "C???p nh???t th??ng tin th??nh c??ng", type: "success",
                position:"top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: false ,autoClose:3000});
                setBackdrop(false)
                props.refreshData()
            })
            .catch((error) => {
                toast.update(id, { render: "C???p nh???t th??ng tin th???t b???i", type: "error", isLoading: false ,autoClose:3000});
                setBackdrop(false)


            });

    }

    

    const handleUpdateInfor = () => {
        updateInfor()
    }

    return (
        <>
            <div className="diaglog-update-infor-product">
                <div className="images">
                    <input type='file' onChange={onSelectFile} id="img" className='custom-file-input' name="img" accept="image/*" multiple />
                    {listImage.map((value) => { return <ListImage deleteImage={() => handleDeleteImage(value)} url={value.isLocal ? URL.createObjectURL(value.url) : value.url}></ListImage> })}
                </div>
                <div className="infor-update">
                    <div className="full-with-infor">
                        <TextField fullWidth
                            error={messProductName}
                            id="filled-helperText"
                            label="T??n s???n ph???m"
                            onChange={(e) => handleChangeProductName(e.target.value)}
                            helperText={messProductName}
                            variant="standard"
                            value={productName}
                        />
                    </div>
                    <div className="full-with-infor"> <TextField fullWidth
                        error={messProductTitles}
                        variant="standard"
                        id="outlined-error"
                        label="Ti??u ?????"
                        value={productTitle}
                        onChange={e => handleChangeProductTitles(e.target.value)}
                        helperText={messProductTitles} />
                    </div>

                    <div className="full-with-infor" style={{ lineHeight: '195px' }}>   <TextField fullWidth
                        error={messDescribe}
                        id="outlined-multiline-static"
                        label="M?? t??? s???n ph???m"
                        variant="standard"
                        multiline
                        rows={6}
                        value={describe}
                        onChange={e => handleChangeDescribe(e.target.value)}
                        helperText={messDescribe}
                    />
                    </div>

                    <div>
                        <TextField
                            error={messPrice ? true : false}
                            label="Gi?? ti???n"
                            value={price}
                            onChange={e => { handleChangePrice(e.target.value) }}
                            name="numberformat"
                            id="formatted-numberformat-input"
                            helperText={messPrice}
                            variant="standard"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position="start">VN??</InputAdornment>,
                            }}

                        />
                    </div>
                    <div style={{ marginTop: 20 }}></div>

                </div>

            </div>
            <DialogActions>
                <Button sx={{ backgroundColor: 'red' }} onClick={() => props.deletePostProduct(props.product.productId)} color="warning" variant="contained" >G??? tin n??y</Button>
                <Button sx={{ backgroundColor: '#3fbe56' }} onClick={() => handleUpdateInfor()} color="success" variant="contained" >C???p nh???t</Button>
                <Button sx={{ backgroundColor: '#3fbe56' }} onClick={props.closeDialog} color="success" variant="contained" >Tho??t</Button>
            </DialogActions>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                
            </Backdrop>
            <ToastContainer
               
            />
            {/* Same as */}
            <ToastContainer />
        </>
    );
}

export default UpdateInforProduct;