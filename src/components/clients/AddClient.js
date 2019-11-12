import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onInputHandler = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState(() => ({ [targetName]: targetValue }));
  };
  onSubmit = e => {
    const { firestore, history } = this.props;
    e.preventDefault();
    const newClient = this.state;
    if (!newClient.balance) {
      newClient.balance = 0;
    }
    firestore.add({ collection: "clients" }, newClient).then(() => {
      history.push("/");
    });
  };
  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    return (
      <div>
        <Link to="/" className="btn btn--small">
          Back to dashboard
        </Link>
        <div className="add-client-cont">
          <div className="add-client__header">
            <h1>Add Client</h1>
          </div>
          <div className="add-client__body">
            <form
              onSubmit={this.onSubmit}
              className="add-client__form"
              action=""
            >
              <label htmlFor="firstName">First Name</label>
              <input
                onChange={this.onInputHandler}
                value={firstName}
                type="text"
                name="firstName"
                minLength="2"
                required
              />
              <label htmlFor="LastName">Last Name</label>
              <input
                onChange={this.onInputHandler}
                value={lastName}
                type="text"
                name="lastName"
                minLength="2"
                required
              />
              <label htmlFor="email">email</label>
              <input
                onChange={this.onInputHandler}
                value={email}
                type="email"
                name="email"
              />
              <label htmlFor="phone">Phone</label>
              <input
                onChange={this.onInputHandler}
                value={phone}
                type="text"
                name="phone"
                required
              />
              <label htmlFor="balance">Balance</label>
              <input
                onChange={this.onInputHandler}
                value={balance}
                type="number"
                name="balance"
              />
              <input value="Create" className="btn" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
