/* eslint-disable import/default */
import React from "react";
//import { render } from "react-dom";
//import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/configureStore";
import Root from "./components/App";
import "./styles/styles.scss"; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require("./favicon.ico"); // Tell webpack to load favicon.ico

const store = configureStore();

export default function getStore() {
  return store;
}

//const getGameIdFromUri = () => {
  //const parsedUrl = new URL(window.location.href);
  //return parsedUrl.searchParams.get("gameID");
//};

{/*

render(
  <AppContainer>
    <Root store={store} history={history} gameIdFromUri={getGameIdFromUri()} />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} gameIdFromUri={getGameIdFromUri()} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}

*/}

ReactDOM.render(
  <Provider store={store}>
    <Root history={history} />
    {/* <Root history={history} gameIdFromUri={getGameIdFromUri()} /> */}
  </Provider>,
  document.getElementById("app")
);
