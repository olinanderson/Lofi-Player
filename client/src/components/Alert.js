import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  if (alerts !== undefined && alerts.length > 0) {
    let innerAlerts = alerts.map((alert) => {
      let firstMessage;
      if (alert.alertType === "Primary") {
        firstMessage = "Note:";
      } else {
        firstMessage = alert.alertType + "!";
      }

      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          <span className="innerAlertType">{firstMessage}</span>
          {" " + alert.msg}
        </div>
      );
    });
    return <div className="outerAlerts">{innerAlerts}</div>;
  } else {
    return null;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
