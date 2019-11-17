import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Alert from "../layouts/Alert";
import { notifyUser } from "../../actions/notifyAction";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState(() => ({
      [inputName]: inputValue
    }));
  };
  onLoginSubmit = e => {
    e.preventDefault();
    const { firebase, history, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .then(() => history.push("/"))
      .catch(() => notifyUser("invalid login credential", "error"));
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="login">
        {message ? <Alert message={message} messageType={messageType} /> : null}
        <h1>Login</h1>
        <form
          className="login__form add-client__form "
          onSubmit={this.onLoginSubmit}
        >
          <label htmlFor="email">Email: </label>
          <input onChange={this.onChange} name="email" type="text" required />

          <label htmlFor="password">Password: </label>
          <input
            autoComplete="current-password"
            type="password"
            name="password"
            onChange={this.onChange}
            required
          />

          <input className="btn login-submit" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object
};
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
