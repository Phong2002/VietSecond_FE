import './Category.css'
import {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

function Category(props) {
    console.log(props.categories.length!=0?props.categories[0].parentId?props.categories[0].parentId:0:0)
    const buttonHead = ()=>{
        if(props.categories.length!=0?props.categories[0].parentId?true:false:false){
            return <ArrowBackIcon onClick={()=>props.handleClickButtonBackOnHeader()} ></ArrowBackIcon>
        }
        else{
            return <CloseIcon onClick={props.handleClickOutsideModal}></CloseIcon>
        }
    }

    const handleClickCategory=(category)=>{
        props.handleClickCategory(category)
        if(category.categories.length===0){
            props.closeModal()
        }
        else{
            props.setCategories(category.categories)
        }
    }

    const displayCategory = ()=>{
       return props.categories.map((value)=>{
           return <li key={value.id} onClick={()=>handleClickCategory(value)} className='category'>{value.categoryName}</li>
        })
    }

    return (
        <div className="category-list">
            <div className="category-head">
                <div className="button-head" >{buttonHead()}</div>
                <h4 className="auto-padding">Đăng tin</h4>
            </div>
            <div className="category-body">
              <h4>DANH MỤC SẢN PHẨM</h4>
                <ul>
                    {displayCategory()}
                </ul>
            </div>
        </div>
    );
}

export default Category;