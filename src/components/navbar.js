import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white">
      <Link to="/" className="navbar-brand">React Ku</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/product" className="nav-link">Product</Link>
          </li>
          <li className="nav-item">
            <Link to="/form" className="nav-link">Form</Link>
          </li>
        </ul>
        <form className="input-group form-search w-70 mx-auto">
          <input type="text" className="form-control" placeholder="Cari sepatu nike"/>
          <div className="input-group-append">
            <button className="btn btn-search" type="button">Button</button>
          </div>
        </form>
        <Link to="/login"><button className="btn btn-outline-primary btn-login btn-header mr-2">Masuk</button></Link>
        <Link to="/register"><button className="btn btn-primary btn-header">Daftar</button></Link>
      </div>
    </nav>
  )
}
