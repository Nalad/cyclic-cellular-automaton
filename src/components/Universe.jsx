// @flow

import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Utilities from "../Utilities";
import Params from "./Params";
import Preset from "./Preset";
import presets from "../presets.json";

const COLS = 80;
const ROWS = 64;
const COLORS = ["black", "yellow", "orange", "red"];

const Row = styled.div`
  min-width: 400px;
  min-height: 5px;

  &:after {
    clear: both;
    display: table;
    content: "";
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  border: 0.1rem solid white;
  border-radius: 0.8rem;
  font-size: x-large;
  outline: none;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const PresetsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
`;

const ImageDiv = styled.div`
  margin: 1rem;
  box-shadow: 0px 0px 50px 10px #dba632;
  z-index: -1;
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
    },
    autoReinitialize: boolean
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
      },
      autoReinitialize: true
    };
  }

  componentDidMount() {
    setInterval(this.nextGeneration, 1000 / 30);
  }

  handleParamChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    },
    param: "range" | "threshold"
  ) => {
    const params = Object.assign({}, this.state.params, {
      [param]: +event.currentTarget.value
    });
    this.setState({ params });
  };

  handleMaxNumberOfStatesChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    }
  ) => {
    const params = Object.assign({}, this.state.params, {
      maxNumberOfStates: +event.currentTarget.value
    });
    this.setState({ params });
    this.resetBoard(+event.currentTarget.value);
  };

  handleRangeFunctionChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    }
  ) => {
    let rangeFunction;
    switch (event.currentTarget.id) {
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

  handleParamsChange = (params: {
    range: number,
    threshold: number,
    maxNumberOfStates: number,
    rangeFunction: Function
  }) => {
    this.setState({ params });
    if (this.state.autoReinitialize) this.resetBoard(params.maxNumberOfStates);
  };

  handleAutoReinitializeChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    }
  ) => {
    this.setState({ autoReinitialize: event.currentTarget.checked });
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
        <ImageDiv>
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
        </ImageDiv>
        <div>
          <Params
            handleParamChange={this.handleParamChange}
            handleMaxNumberOfStatesChange={this.handleMaxNumberOfStatesChange}
            handleRangeFunctionChange={this.handleRangeFunctionChange}
            {...this.state.params}
          />
        </div>
        <PresetsDiv>
          {presets.map(preset => (
            <Preset {...preset} handleParamsChange={this.handleParamsChange} />
          ))}
        </PresetsDiv>
        <div>
          <label htmlFor="autoRe">
            <input
              id="autoRe"
              type="checkbox"
              checked={this.state.autoReinitialize}
              onChange={this.handleAutoReinitializeChange}
            />
            Auto reinitialize
          </label>
        </div>
      </FlexDiv>
    );
  }
}

export default Universe;
