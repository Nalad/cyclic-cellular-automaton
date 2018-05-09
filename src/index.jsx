// @flow

import React from "react";
import { render } from "react-dom";
import { injectGlobal } from "styled-components";
import Universe from "./components/Universe";

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: verdana, arial, helvetica, sans-serif;
    background-color: black;
    color: white;
    font-size: medium;
  }
`;

const renderApp = () => {
  const app = document.getElementById("app");
  if (app === null) {
    throw new Error("Can't find 'app' in index.html");
  } else {
    render(
      <div>
        <Universe />
      </div>,
      app
    );
  }
};

renderApp();
