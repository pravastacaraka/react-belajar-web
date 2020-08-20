import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <a className="navbar-brand">Navbar</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/form">
                        <a className="nav-link">Form</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/product">
                        <a className="nav-link">Products</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
            </div>
        </nav>
    )
}