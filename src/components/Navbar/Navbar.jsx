import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
      alert(err.message);
    }
  }

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="search-icon" className='icons'/>
        <p>Children</p>
        <img src={bell_icon} alt="bell-icon" className='icons' />
        <div className="navbar-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={profile} alt="profile" className='profile' />
          <img src={caret_icon} alt="caret-icon" />
          {dropdownOpen && (
            <div className="dropdown">
              <p onClick={handleLogout}>Sign out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar