import './Home.css'
import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Home() {
    const [inputSearch, setInputSearch] = useState('')
    const [placeholder, setPlaceholder] = useState('Tất cả danh mục')
    return (
        <div className="home-screen">
            <div className="search">
                <div className="input-search">
                    <input type="text" value={inputSearch} onChange={e => setInputSearch(e.target.value)}
                        placeholder={placeholder} />
                    <div><SearchIcon sx={{ fontSize: 30 }} /></div>
                </div>
            </div>
        </div>
    );
}

export default Home;