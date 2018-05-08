// @flow

import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Utilities from "../Utilities";
import Params from "./Params";

const COLS = 80;
const ROWS = 64;
const COLORS = ["black", "yellow", "orange", "red"];

const Row = styled.div`
  &:after {
    clear: both;
    display: table;
    content: "";
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  border: white
  border-radius: 0.8rem 0.8rem 0 0;
  font-size: 1.6rem;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {};

class Universe extends React.Component<
  Props,
  {
    board: Array<Array<number>>,
    params: {
      range: number,
      threshold: number,
      maxNumberOfStates: number,
      rangeFunction: Function
    }
  }
> {
  constructor(props: Props) {
    super(props);

    const board = [];
    for (let i = 0; i < ROWS; i += 1) {
      const row = [];
      for (let j = 0; j < COLS; j += 1) {
        row.push(Utilities.getRandomInt(0, 3));
      }
      board.push(row);
    }

    this.state = {
      board,
      params: {
        range: 1,
        threshold: 3,
        maxNumberOfStates: 3,
        rangeFunction: Utilities.countMooreNeighborhood.bind(Utilities)
      }
    };
  }

  componentDidMount() {
    setInterval(this.nextGeneration, 1000 / 30);
  }

  handleParamChange = (
    event: SyntheticKeyboardEvent<HTMLInputElement> & {
      target: HTMLInputElement
    },
    param: "range" | "threshold"
  ) => {
    const params = Object.assign({}, this.state.params, {
      [param]: event.target.value
    });
    this.setState({ params });
  };

  handleMaxNumberOfStatesChange = (
    event: SyntheticKeyboardEvent<HTMLInputElement> & {
      target: HTMLInputElement
    }
  ) => {
    const params = Object.assign({}, this.state.params, {
      maxNumberOfStates: event.target.value
    });
    this.setState({ params });
    this.resetBoard(event.target.value);
  };

  handleRangeFunctionChange = (
    event: SyntheticEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) => {
    let rangeFunction;
    switch (event.target.id) {
      case "moore":
        rangeFunction = Utilities.countMooreNeighborhood.bind(Utilities);
        break;
      case "neumann":
        rangeFunction = Utilities.countVonNeumannNeighborhood.bind(Utilities);
        break;
      default:
        rangeFunction = Utilities.countMooreNeighborhood.bind(Utilities);
    }

    const params = Object.assign({}, this.state.params, { rangeFunction });
    this.setState({ params });
  };

  nextGeneration = () => {
    const newBoard = [];
    for (let i = 0; i < ROWS; i += 1) {
      newBoard[i] = [];
      for (let j = 0; j < COLS; j += 1) {
        let nextState = this.state.board[i][j];
        if (
          this.state.params.rangeFunction(
            this.state.board,
            i,
            j,
            ROWS,
            COLS,
            this.state.params.range,
            this.state.params.maxNumberOfStates
          ) >= this.state.params.threshold
        )
          nextState += 1;
        newBoard[i][j] = nextState % this.state.params.maxNumberOfStates;
      }
    }

    this.setState({ board: newBoard });
  };

  resetBoard = (newNumberOfStates: number) => {
    const board = [];
    for (let i = 0; i < ROWS; i += 1) {
      const row = [];
      for (let j = 0; j < COLS; j += 1) {
        row.push(Utilities.getRandomInt(0, newNumberOfStates));
      }
      board.push(row);
    }

    this.setState({ board });
  };

  render() {
    return (
      <FlexDiv>
        <Button
          onClick={() => this.resetBoard(this.state.params.maxNumberOfStates)}
        >
          Reinitialize
        </Button>
        <div>
          {this.state.board.map(row => (
            <Row>
              {row.map(c => (
                <Cell
                  color={COLORS[c % COLORS.length]}
                  maxNumberOfStates={this.state.params.maxNumberOfStates}
                />
              ))}
            </Row>
          ))}
        </div>
        <div>
          <Params
            handleParamChange={this.handleParamChange}
            handleMaxNumberOfStatesChange={this.handleMaxNumberOfStatesChange}
            handleRangeFunctionChange={this.handleRangeFunctionChange}
            {...this.state.params}
          />
        </div>
      </FlexDiv>
    );
  }
}

export default Universe;
