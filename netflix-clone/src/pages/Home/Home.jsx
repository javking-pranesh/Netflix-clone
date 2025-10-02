import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_img from '../../assets/hero_banner.jpg'
import caption_img from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_img} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={caption_img} alt="" className='caption-img'/>
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy. </p>
          <div className="hero-btns">
            <button className="btn"><img src={play_icon} alt="" />Play</button>
            <button className="btn dark-btn"><img src={info_icon} alt="" />More Info</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
