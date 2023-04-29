import {
  getNoOfBomb,
  getNoOfSquare,
  getNoOfRows,
  getNoOfColumns,
} from "../utilFunctions/utils.js";
// function to get value of cell
const getValue = (x, y, boardCopy, level) => {
  const rows = getNoOfRows(level);
  const columns = getNoOfColumns(level);

  let cnt = 0;
  const dx = [0, 0, -1, 1, -1, -1, 1, 1];
  const dy = [1, -1, 0, 0, -1, 1, -1, 1];
  for (let i = 0; i < 8; i++) {
    const xi = x + dx[i];
    const yi = y + dy[i];
    if (xi >= 0 && yi >= 0 && xi < rows && yi < columns) {
      if (boardCopy[xi][yi].val === -1) cnt += 1;
    }
  }
  return cnt;
};

// function to get initialBoard in 1-D array with bomb position
const getLinearBoard = (level, noOfBombs) => {
  const noOfSquare = getNoOfSquare(level);
  const arr = new Array(noOfSquare);
  for (let i = 0; i < arr.length; i++) {
    if (i < noOfBombs) arr[i] = -1;
    else arr[i] = 0;
  }
  let tmp = [];

  while (tmp.length < noOfSquare) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    tmp.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return tmp;
};

// function to get initial Board with bomb and value
const getBoard = (level, noOfBombs = 10) => {
  noOfBombs = getNoOfBomb(level);
  const linerBoard = getLinearBoard(level, noOfBombs);
  const rows = getNoOfRows(level);
  const columns = getNoOfColumns(level);

  const newBoard = new Array(rows);
  for (let i = 0; i < rows; i++) {
    newBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      newBoard[i].push({
        id: i * columns + j,
        val: linerBoard[i * columns + j],
        isVisible: false,
        isFlag: false,
      });
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (newBoard[i][j].val !== -1)
        newBoard[i][j].val = getValue(i, j, newBoard, level);
    }
  }
  return newBoard;
};

const showAllMines = (board) => {
  const rows = board?.length;
  const columns = board[0]?.length;

  const mines = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j].val === -1 && board[i][j].isVisible === false) {
        mines.push({ x: i, y: j });
      }
    }
  }
  let newBoard = new Array(rows);
  for (let i = 0; i < rows; i++) {
    newBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      if (mines.some((element) => element.x === i && element.y === j)) {
        newBoard[i].push({
          ...board[i][j],
          isVisible: true,
        });
      } else {
        newBoard[i].push({ ...board[i][j] });
      }
    }
  }
  return newBoard;
};

export default getBoard;

export { showAllMines };
