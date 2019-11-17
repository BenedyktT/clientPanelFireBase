import React, { Component } from "react";
import { connect } from "react-redux";
import {
  disableBalanceOnAdd,
  disableBalanceOnEdit,
  allowRegistration
} from "../actions/settingsAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Settings extends Component {
  allowRegistrationChange = () => {
    this.props.allowRegistration();
  };
  disableBalanceOnAddChange = () => {
    this.props.disableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    this.props.disableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <Link to="/" className="btn btn--small">
            Back to dashboard
          </Link>
        </div>
        <div className="settings-wrapper">
          <form>
            <div className="form-group">
              <label htmlFor="registration">Allow registration: </label>
              <input
                type="checkbox"
                name="registration"
                checked={!!allowRegistration}
                onChange={this.allowRegistrationChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Disable Balance on add: </label>
              <input
                type="checkbox"
                name="balance"
                checked={!!disableBalanceOnAdd}
                onChange={this.disableBalanceOnAddChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Disable Balance on Edit: </label>
              <input
                type="checkbox"
                name="balance"
                checked={!!disableBalanceOnEdit}
                onChange={this.disableBalanceOnEditChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  disableBalanceOnAdd: PropTypes.func.isRequired,
  disableBalanceOnEdit: PropTypes.func.isRequired,
  allowRegistration: PropTypes.func.isRequired
};
export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration }
)(Settings);
