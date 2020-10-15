/* eslint-disable import/default */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Root from "./components/App";
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

export default function getStore() {
  return store;
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);
