import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;
    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updateClient)
      .then(() => {
        history.push(`/client/${this.props.match.params.id}`);
      });
  };
  render() {
    const { client, disableBalanceOnEdit } = this.props;

    if (client) {
      const { firstName, lastName, phone, email, balance } = client;
      return (
        <div>
          <Link to="/" className="btn btn--small">
            Back to dashboard
          </Link>
          <div className="add-client-cont">
            <div className="add-client__header">
              <h1>Edit Client</h1>
            </div>
            <div className="add-client__body">
              <form
                onSubmit={this.onSubmit}
                className="add-client__form"
                action=""
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  ref={this.firstNameInput}
                  defaultValue={firstName}
                  type="text"
                  name="firstName"
                  minLength="2"
                  required
                />
                <label htmlFor="LastName">Last Name</label>
                <input
                  ref={this.lastNameInput}
                  defaultValue={lastName}
                  type="text"
                  name="lastName"
                  minLength="2"
                  required
                />
                <label htmlFor="email">email</label>
                <input
                  ref={this.emailInput}
                  defaultValue={email}
                  type="email"
                  name="email"
                />
                <label htmlFor="phone">Phone</label>
                <input
                  ref={this.phoneInput}
                  defaultValue={phone}
                  type="text"
                  name="phone"
                  required
                />
                <label htmlFor="balance">Balance</label>
                <input
                  disabled={disableBalanceOnEdit}
                  ref={this.balanceInput}
                  defaultValue={balance}
                  type="number"
                  name="balance"
                />
                <input value="Edit" className="btn" type="submit" />
              </form>
            </div>
          </div>
        </div>
      );
    }

    return <Spinner />;
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    disableBalanceOnEdit: settings.disableBalanceOnEdit
  }))
)(EditClient);
