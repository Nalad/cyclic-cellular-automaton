// @flow

import React from "react";
import styled from "styled-components";
import Utilities from "../Utilities";

const Button = styled.button`
  width: auto;
  background: black;
  color: white;
  border: 0.1rem white solid;
  border-radius: 0.5rem;
`;

const Preset = (props: {
  name: string,
  range: number,
  threshold: number,
  states: number,
  neighborhood: "moore" | "neumann",
  handleParamsChange: Function
}) => (
  <Button
    onClick={() => {
      const rangeFunction =
        props.neighborhood === "moore"
          ? Utilities.countMooreNeighborhood.bind(Utilities)
          : Utilities.countVonNeumannNeighborhood.bind(Utilities);
      props.handleParamsChange({
        range: props.range,
        threshold: props.threshold,
        maxNumberOfStates: props.states,
        rangeFunction
      });
    }}
  >
    {props.name}
  </Button>
);

export default Preset;
