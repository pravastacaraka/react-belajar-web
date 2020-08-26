import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMobileAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  return (
    <div className="header-wrapper sticky-top bg-white">
      <div className="top-header">
        <div className="left-top-header">
          <FontAwesomeIcon icon={faMobileAlt} className="fa-lg" />
          <Link to="/mobile-apps/" target="_blank" className="header-link">
            Download ReactKu App
          </Link>
        </div>
        <div className="right-top-header">
          <Link to="/about/" target="_blank" className="header-link">Tentang ReactKu</Link>
          <Link to="/promo/" target="_blank" className="header-link">Promo</Link>
          <Link to="/help/" target="_blank" className="header-link">ReactKu Care</Link>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">React Ku</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/products" className="nav-link">Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/form" className="nav-link">Form</Link>
            </li>
          </ul>
          <form className="input-group form-search w-70 mx-lg-auto mx-sm-3">
            <input type="text" className="form-control" placeholder="Cari sepatu nike"/>
            <div className="input-group-append">
              <button className="btn btn-search" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <div className="nav-link" style={{ padding: ".2rem .7rem", cursor: "pointer" }}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
            </li>
          </ul>
          <Link to="/login"><button className="btn btn-outline-primary btn-login btn-header mr-2">Masuk</button></Link>
          <Link to="/register"><button className="btn btn-primary btn-header">Daftar</button></Link>
        </div>
      </nav>
    </div>
  )
}
