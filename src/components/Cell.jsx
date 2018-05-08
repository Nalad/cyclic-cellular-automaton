// @flow

import React from "react";
import styled from "styled-components";

const Div = styled.div`
  height: 5px;
  width: 5px;
  background: ${props => props.color};
  float: left;
`;

class Cell extends React.Component<{ color: string }> {
  shouldComponentUpdate(nextProps) {
    return this.props.color !== nextProps.color;
  }

  render() {
    return <Div color={this.props.color} />;
  }
}

export default Cell;
