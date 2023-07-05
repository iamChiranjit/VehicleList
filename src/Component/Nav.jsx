import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
  return (
    <div id='nav'>
        <Link to="/home">Home</Link>
        <Link to="/likeList">Favourite</Link>
    </div>
  )
}

export default Nav