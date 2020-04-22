import "office-ui-fabric-react/dist/css/fabric.min.css";
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter } from 'react-router-dom'
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
/* global AppCpntainer, Component, document, Office, module, React, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Anti Phishing";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
      <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </HashRouter>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
