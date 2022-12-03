import { useState, useEffect } from 'react'
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Category from '../post/Category.js'
import ListImage from '../post/ListImage'
import { URL_API } from '../../../api/Url.js'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function CreateNewProduct(props) {

    const [categories, setCategories] = useState([])
    const [openModal, setOpenModal] = useState(true);
    const [categoryChoose, setCategoryChoose] = useState([])
    const [pathCategory, setPathCategory] = useState([])
    const [idCategory, setIdCategory] = useState('')
    const [stateProduct, setStateproduct] = useState("NEW")
    const [productName, setProductName] = useState("")

    const [backdrop, setBackdrop] = useState(false)

    const [messProductName, setMessProductName] = useState("")
    const [listImageURL, setListImageURL] = useState([])

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

    const handleChangeProductName = (value) => {
        setProductName(value)
        if (value.length == 0) {
            setMessProductName("Vui lòng điền tên sản phẩm")
        }
        else {
            setMessProductName("")
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


    const createProduct = () => {
        setBackdrop(true)
        const FormData = require('form-data');
        let data = new FormData();
        listImageURL.forEach((value) => data.append('files', value))
        data.append('categoryId', idCategory);
        data.append('usageStatus', stateProduct);
        data.append('productName', productName);
        let config = {
            method: 'post',
            url: `${URL_API}product`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                setBackdrop(false)
                props.toastSuccess("Thêm sản phẩm mới thành công!")
                props.refreshData()
            })
            .catch((error) => {
                setBackdrop(false)
                props.Error("Thêm sản phẩm mới thất bại!")
            });
    }
    const handlePostProduct = () => {
        createProduct();
    }

    const handleDeleImage = (url) => {
        const newLIistImage = listImageURL.filter((value) => {
            return value !== url
        })
        setListImageURL(newLIistImage)
    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {

            return
        }

        if (listImageURL.length < 5) {
            setListImageURL([...listImageURL, ...e.target.files].slice(0, 5))
        }
    }
    useEffect((() => fetchCategories(0)), [])

    return (
        <div className="new-product-container">
            <div style={{ display: "flex" }}>

                <div className="post-image" style={{ height: "550px" }}>
                    <h4 style={{ dispay: 'block', textAlign: 'center', margin: '10px' }}>Ảnh sản phẩm</h4>
                    <div>
                        <div className="total-image" style={listImageURL.length == 5 ? { color: 'red' } : {}}>Số lượng ảnh {listImageURL.length}/5</div>
                        <input type='file' onChange={onSelectFile} id="img" className='custom-file-input' name="img" accept="image/*" multiple />
                        {selectedFile && <img src={preview} />}
                    </div>
                    <div className="post-list-image" style={{ marginTop: '15px' }}>
                        {listImageURL.map((value) => {
                            return <ListImage url={value} deleteImage={() => handleDeleImage(value)} />
                        })}
                    </div>

                </div>




                <div className="post-infor">
                    <h4 style={{ dispay: 'block', textAlign: 'center', margin: '10px' }}>Thông tin chi tiết</h4>
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

            <DialogActions>
                <Button sx={{ backgroundColor: '#3fbe56' }} onClick={handlePostProduct} color="success" variant="contained" >Thêm sản phẩm này</Button>
                <Button sx={{ backgroundColor: '#3fbe56' }} onClick={props.closeDialog} color="success" variant="contained" >Thoát</Button>
            </DialogActions>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress />
            </Backdrop>
        </div>
    );
}

export default CreateNewProduct;