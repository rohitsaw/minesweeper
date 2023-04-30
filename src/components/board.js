import { useEffect, useState } from "react";
import Square from "./square";
import useSound from "use-sound";

import { showAllMines } from "../utilFunctions/getBoard.js";
import { getAlert as getAlertBox } from "./modal.js";
import {
  getNoOfRows,
  getNoOfColumns,
  getNoOfSquare,
  getCellSize,
} from "../utilFunctions/utils.js";
import Grid from "@mui/material/Grid";
import Header from "./header";

import rightSound from "../assets/right.wav";
import gameWinSound from "../assets/gameWin.wav";
import gameOver from "../assets/gameOver.wav";
import placeFlagSound from "../assets/placeFlag.wav";

function Board({ state, dispatch, restartFn }) {
  const rows = getNoOfRows(state.level);
  const columns = getNoOfColumns(state.level);
  const squares = getNoOfSquare(state.level);
  const size = getCellSize(state.level);
  const width =
    (getCellSize(state.level) + 1) * getNoOfColumns(state.level) + 4;

  const [playRightMoveSound] = useSound(rightSound, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playGameWinSound] = useSound(gameWinSound, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playGameOverSound] = useSound(gameOver, {
    soundEnabled: state.isSoundEnabled,
  });
  const [playPlaceFlagSound] = useSound(placeFlagSound, {
    soundEnabled: state.isSoundEnabled,
  });

  const [currentClickCellId, setCurrentClick] = useState(-1);

  useEffect(() => {
    if (state.isGameOver) return;
    let found = 0;
    let flag = 0;
    let lost = false;
    let minesFound = 0;

    for (let row of state.board) {
      for (let each of row) {
        if (each.isFlag) {
          flag += 1;
        }
        if (each.val === -1 && each.isVisible) {
          lost = true;
          minesFound += 1;
        } else if (each.val !== -1 && each.isVisible) {
          found += 1;
        }
      }
    }

    dispatch({ type: "setNoOfFlag", payload: flag });

    if (lost === true && minesFound < state.noOfBombs) {
      dispatch({ type: "setGameOver", payload: showAllMines(state.board) });
      playGameOverSound();
      getAlertBox(false, "Game Over", restartFn);
    } else if (
      found === squares - state.noOfBombs &&
      flag === state.noOfBombs
    ) {
      dispatch({ type: "setGameOver" });
      playGameWinSound();
      getAlertBox(true, "Congratulation! You Won", restartFn);
    }
  }, [state.board]);

  const handleRightClick = (id) => {
    if (state.isGameOver) return;

    const row = Math.floor(id / columns);
    const col = id % columns;

    if (state.board[row][col].isVisible) return;
    if (!state.board[row][col].isFlag && state.noOfFlags <= 0) return;

    let newBoard = new Array(rows);
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < columns; j++) {
        newBoard[i].push({
          ...state.board[i][j],
          isFlag:
            i === row && j === col
              ? !state.board[i][j].isFlag
              : state.board[i][j].isFlag,
        });
      }
    }
    dispatch({ type: "setBoard", payload: newBoard });
    playPlaceFlagSound();
  };

  const handleClick = (id) => {
    if (state.isGameOver) return;

    const row = Math.floor(id / columns);
    const col = id % columns;

    if (state.board[row][col].isFlag || state.board[row][col].isVisible) return;

    setCurrentClick(id);

    const dx = [0, 0, -1, 1, -1, -1, 1, 1];
    const dy = [1, -1, 0, 0, -1, 1, -1, 1];

    // for bfs queue
    let arr = [];

    // for tracking visted element
    let tmp = [];
    arr.push({ x: row, y: col });
    tmp.push({ x: row, y: col });

    while (arr.length > 0) {
      const { x, y } = arr.shift();
      if (state.board[x][y].val === 0) {
        for (let i = 0; i < 8; i++) {
          const xi = x + dx[i];
          const yi = y + dy[i];
          if (xi >= 0 && yi >= 0 && xi < rows && yi < columns) {
            if (
              !tmp.some((ele) => ele.x === xi && ele.y === yi) &&
              state.board[xi][yi].val !== -1 &&
              !state.board[xi][yi].isFlag
            ) {
              arr.push({ x: xi, y: yi });
              tmp.push({ x: xi, y: yi });
            }
          }
        }
      }
    }
    let newBoard = new Array(rows);
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < columns; j++) {
        if (tmp.some((element) => element.x === i && element.y === j)) {
          newBoard[i].push({
            ...state.board[i][j],
            isVisible: true,
            isFlag: false,
          });
        } else {
          newBoard[i].push({ ...state.board[i][j] });
        }
      }
    }
    dispatch({ type: "setBoard", payload: newBoard });
    playRightMoveSound();
  };

  return !state.level ? null : (
    <>
      <Header
        width={width}
        state={state}
        dispatch={dispatch}
        getDifficultyMenu={restartFn}
      />
      <Grid container>
        <Grid item>
          <table>
            <tbody>
              {state.board.map((item, _) => (
                <tr style={{ display: "flex" }}>
                  {item.map((each) => (
                    <Square
                      key={each.id}
                      id={each.id}
                      row={Math.floor(each.id / columns)}
                      column={each.id % columns}
                      val={each.val}
                      isVisible={each.isVisible}
                      isFlag={each.isFlag}
                      handleClick={handleClick}
                      handleRightClick={handleRightClick}
                      size={size}
                      isCurrentClickCellId={currentClickCellId === each.id}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div>How To Play?</div>
          <div> Coming Soon! </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Board;
