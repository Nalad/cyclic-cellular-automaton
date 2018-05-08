// @flow

export default {
  getNeighborCount(
    board: Array<Array<boolean>>,
    row: number,
    col: number,
    rowsNum: number,
    colsNum: number
  ) {
    let liveNeighbors = 0;

    if (board[this.mod(row - 1, rowsNum)][col]) {
      liveNeighbors += 1;
    }
    if (board[this.mod(row - 1, rowsNum)][this.mod(col + 1, colsNum)]) {
      liveNeighbors += 1;
    }
    if (board[row][this.mod(col + 1, colsNum)]) {
      liveNeighbors += 1;
    }
    if (board[this.mod(row + 1, rowsNum)][this.mod(col + 1, colsNum)]) {
      liveNeighbors += 1;
    }
    if (board[this.mod(row + 1, rowsNum)][col]) {
      liveNeighbors += 1;
    }
    if (board[this.mod(row + 1, rowsNum)][this.mod(col - 1, colsNum)]) {
      liveNeighbors += 1;
    }
    if (board[row][this.mod(col - 1, colsNum)]) {
      liveNeighbors += 1;
    }
    if (board[this.mod(row - 1, rowsNum)][this.mod(col - 1, colsNum)]) {
      liveNeighbors += 1;
    }

    return liveNeighbors;
  },

  countMooreNeighborhood(
    board: Array<Array<number>>,
    row: number,
    col: number,
    rowsNum: number,
    colsNum: number,
    range: number,
    maxNumberOfStates: number
  ) {
    let num = 0;
    const statePlusOne = (board[row][col] + 1) % maxNumberOfStates;

    for (let i = -range; i <= range; i += 1) {
      for (let j = -range; j <= range; j += 1) {
        if (
          board[this.mod(row + i, rowsNum)][this.mod(col + j, colsNum)] ===
          statePlusOne
        )
          num += 1;
      }
    }

    return num;
  },

  countVonNeumannNeighborhood(
    board: Array<Array<number>>,
    row: number,
    col: number,
    rowsNum: number,
    colsNum: number,
    range: number,
    maxNumberOfStates: number
  ) {
    let num = 0;
    const statePlusOne = (board[row][col] + 1) % maxNumberOfStates;

    for (let i = -range; i <= range; i += 1) {
      for (let j = -range; j <= range; j += 1) {
        if (Math.abs(i) + Math.abs(j) <= range) {
          if (
            board[this.mod(row + i, rowsNum)][this.mod(col + j, colsNum)] ===
            statePlusOne
          )
            num += 1;
        }
      }
    }

    return num;
  },

  mod(x: number, m: number) {
    return (x % m + m) % m;
  },

  getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled)) + minCeiled;
  }
};
