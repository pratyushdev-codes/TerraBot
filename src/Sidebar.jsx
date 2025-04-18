import React from 'react';
import { BsCart3, BsGrid1X2Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""  } style={{textDecoration:"non"}}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
            <h2 style={{color:"white", fontWeight:"bolder"}}> <img src='./images/logo.png' style={{height:"33px", width:"35px"}}/> &nbsp;TerraBot</h2>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
      <Link to="/">
        <li className='sidebar-list-item'>
          <a href="">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        </Link>
       




<Link to="/chatbot">
        <li className='sidebar-list-item'>
      
            <i className="fa-solid fa-poo-storm"></i> &nbsp;TerraBot AI Chatbot
    
        </li>
        </Link>

      </ul>
    </aside>
  );
}

export default Sidebar;
