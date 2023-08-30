import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [cat,setCat] = useState([]);
    useEffect(()=>{
        const getCat = async() =>{
            const res = await axios.get("http://localhost:4000/api/categories");
            setCat(res.data)
        }
        getCat()
    },[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img
                className='sidebarImg'
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt=""
            />
            <p>
            Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
            amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cat.map((c)=>(
                    <Link to={`/?cat=${c.name}`} key={c._id} className='link'>
                        <li className="sidebarListItem" key={c._id}>{c.name}</li>
                    </Link>
                ))}
            </ul>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <ul className="sidebarSocial">
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>      
            </ul>
        </div>
    </div>
  )
}

export default SideBar