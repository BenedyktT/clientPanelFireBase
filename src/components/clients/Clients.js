import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { summarizers } from "istanbul-lib-report";

class Clients extends Component {
  state = {
    totalBalance: 0
  };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return {
        totalBalance: total
      };
    }
    return null;
  }
  render() {
    const { clients } = this.props;

    if (clients) {
      return (
        <div className="">
          <h5 className="total-owed">
            Total owed {"  "}: {this.state.totalBalance}
          </h5>
          <table className="blueTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName + " " + client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${client.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(() => ["clients"]), // or { collection: 'todos' }
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
