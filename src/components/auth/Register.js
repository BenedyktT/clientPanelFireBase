import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Alert from "../layouts/Alert";
import { notifyUser } from "../../actions/notifyAction";
class Register extends React.Component {
  state = {
    email: "",
    password: ""
  };
  componentWillMount() {
    const { allowRegistration } = this.props;
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }
  onChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState(() => ({
      [inputName]: inputValue
    }));
  };
  onLoginSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .createUser({
        email,
        password
      })
      .catch(e => notifyUser("user already exist", "error"));
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div>
        <div className="login">
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <h1>Register</h1>
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

            <input
              className="btn login-submit"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    );
  }
}
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      allowRegistration: state.settings.allowRegistration
    }),
    { notifyUser }
  )
)(Register);
