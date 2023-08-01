import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import "./bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
