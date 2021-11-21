import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <div className="notFound">
        <i className="far fa-frown fa-8x"></i>
        <h1>404</h1>
        <h3>Page not found.</h3>
      </div>
    </Fragment>
  );
};

export default NotFound;
