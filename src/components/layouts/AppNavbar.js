import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { allowRegistration } from "../../actions/settingsAction";

class AppNavbar extends Component {
  state = {
    isNavbarOpen: false,
    isNavbarCollapsed: false,
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else return { isAuthenticated: false };
  }
  onLogout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { auth, allowRegistration } = this.props;
    const { isAuthenticated } = this.state;
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
            {this.state.isAuthenticated && (
              <li className="navbar__link">
                <Link to="/">Dashboard</Link>
              </li>
            )}
            {this.state.isAuthenticated && (
              <li className="navbar__link">
                <Link to="/settings">Settings</Link>
              </li>
            )}
            <li className="navbar__link login-link">
              {this.state.isAuthenticated && (
                <div className="login-el">
                  <button className="btn" onClick={this.onLogout}>
                    Log out
                  </button>
                  {<small className="user-name--small">{auth.email}</small>}
                </div>
              )}
              {!isAuthenticated && allowRegistration && (
                <Link to="/register" className="btn">
                  Registration
                </Link>
              )}
            </li>
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
AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    allowRegistration: state.settings.allowRegistration
  }))
)(AppNavbar);
