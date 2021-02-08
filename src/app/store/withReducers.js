import React from "react";
import { injectReducer } from "./index";

const withReducers = (reducers) => (WrappedComponent) => {
  Object.entries(reducers).forEach(([key, reducer]) =>
    injectReducer(key, reducer)
  );

  return (props) => <WrappedComponent {...props} />;
};

export default withReducers;
