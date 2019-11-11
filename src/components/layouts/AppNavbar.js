import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AppNavbar extends Component {
  state = {
    isNavbarOpen: false,
    isNavbarCollapsed: false
  };
  render() {
    return (
      <header className="header">
        <div className="header__brand">
          <h1>
            <Link to="/">Client Panel</Link>
          </h1>
        </div>
        <nav className="navbar">
          <ul
            className={
              this.state.isNavbarOpen
                ? "navbar__links is-collapsed"
                : "navbar__links"
            }
          >
            <li className="navbar__link">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="navbar__link">Help</li>
          </ul>
          <button
            onClick={() =>
              this.setState({ isNavbarOpen: !this.state.isNavbarOpen })
            }
            className={
              this.state.isNavbarOpen
                ? `hamburger hamburger--spin is-active`
                : `hamburger hamburger--spin`
            }
            type="button"
            aria-label="Menu"
            aria-controls="navigation"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </nav>
      </header>
    );
  }
}
