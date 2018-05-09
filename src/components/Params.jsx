// @flow

import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Params = (props: {
  handleParamChange: Function,
  handleMaxNumberOfStatesChange: Function,
  handleRangeFunctionChange: Function,
  range: number,
  threshold: number,
  maxNumberOfStates: number,
  rangeFunction: Function
}) => (
  <div>
    <form>
      <label htmlFor="range">
        Range:&nbsp;
        <input
          id="range"
          type="text"
          onChange={e => props.handleParamChange(e, "range")}
          value={props.range}
        />
      </label>
      <label htmlFor="threshold">
        Threshold:&nbsp;
        <input
          id="threshold"
          type="text"
          onChange={e => props.handleParamChange(e, "threshold")}
          value={props.threshold}
        />
      </label>
      <label htmlFor="states">
        States:&nbsp;
        <input
          id="states"
          type="text"
          onChange={props.handleMaxNumberOfStatesChange}
          value={props.maxNumberOfStates}
        />
      </label>
    </form>
    <Form>
      <label htmlFor="moore">
        <input
          id="moore"
          type="radio"
          name="rangeFunction"
          checked={props.rangeFunction.name === "bound countMooreNeighborhood"}
          onChange={props.handleRangeFunctionChange}
        />
        Moore
      </label>
      <label htmlFor="neumann">
        <input
          id="neumann"
          type="radio"
          name="rangeFunction"
          checked={
            props.rangeFunction.name === "bound countVonNeumannNeighborhood"
          }
          onChange={props.handleRangeFunctionChange}
        />
        Neumann
      </label>
    </Form>
  </div>
);

export default Params;
