import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };
  onDeleteClick = () => {
    const { client, firestore } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(() => this.props.history.push("/"));
  };
  onChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState(() => ({
      [targetName]: targetValue
    }));
  };
  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };
  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;
    let balanceForm = "";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <input
            type="text"
            name="balanceUpdateAmount"
            placeholder="add new balance"
            value={balanceUpdateAmount}
            onChange={this.onChange}
          />
          <input type="submit" value="update" className="btn btn--green" />
        </form>
      );
    } else {
      balanceForm = null;
    }
    if (client) {
      return (
        <div className="clientdetails-wrapper">
          <div className="client-nav">
            <Link to="/" className="btn btn--small">
              Back to dashboard
            </Link>
            <div className="client-actions">
              <Link to={`/client/edit/${client.id}`} className="btn btn--green">
                Edit
              </Link>
              <button onClick={this.onDeleteClick} className="btn btn--red">
                Remove
              </button>
            </div>
          </div>
          <div className="client-wrapper">
            <div className="client-name">
              <h1>{`${client.firstName} ${client.lastName}`}</h1>
            </div>
            <div className="client-id">
              Client ID:<span> {client.id}</span>
            </div>
            <div className="client-balance">
              Balance:{" "}
              <span
                className={classnames({
                  balance_red: parseFloat(client.balance.toString()) > 0,
                  balance_green: parseFloat(client.balance.toString()) === 0
                })}
              >
                {client.balance}
              </span>
              <small>
                <button
                  style={{ marginLeft: "0.5rem" }}
                  href="#"
                  onClick={() =>
                    this.setState(() => ({
                      showBalanceUpdate: !this.state.showBalanceUpdate
                    }))
                  }
                >
                  edit
                </button>
              </small>
            </div>
            <div className="client-contact">
              <div className="client-email">
                Client email: <span>{client.email}</span>
              </div>
              <hr />
              <div className="client-phone">
                Client phone: <span>{client.phone}</span>
              </div>
            </div>

            {balanceForm ? (
              <div className="client-addbalance">{balanceForm}</div>
            ) : null}
          </div>
        </div>
      );
    }
    return (
      <div>
        <Link to="/" className="btn btn--small">
          Back to dashboard
        </Link>
        <Spinner />
      </div>
    );
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
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
