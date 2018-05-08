// @flow

import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Universe from "./components/Universe";

const Div = styled.div`
  font-family: sans-serif;
`;

const renderApp = () => {
  const app = document.getElementById("app");
  if (app === null) {
    throw new Error("Can't find 'app' in index.html");
  } else {
    render(
      <Div>
        <Universe />
      </Div>,
      app
    );
  }
};

renderApp();
