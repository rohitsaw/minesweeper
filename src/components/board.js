import { useEffect, useState } from "react";
import Square from "./square";
import useSound from "use-sound";

import { showAllMines } from "../utilFunctions/getBoard.js";
import { getAlert as getAlertBox } from "./modal.js";
import {
  getNoOfRows,
  getNoOfColumns,
  getNoOfSquare,
  getNoOfFlag,
  getCellSize,
} from "../utilFunctions/utils.js";
import Grid from "@mui/material/Grid";
import Header from "./header";

import rightSound from "../assets/right.wav";
import gameWinSound from "../assets/gameWin.wav";
import gameOver from "../assets/gameOver.wav";
import placeFlagSound from "../assets/placeFlag.wav";

function Board({
  level,

  board,
  setBoard,

  noOfFlags,
  setNoOflags,

  noOfBombs,

  isGameOver,

  isSoundEnabled,
  setIsSoundEnabled,

  restartFn,
  gameOverFn,
}) {
  const rows = getNoOfRows(level);
  const columns = getNoOfColumns(level);
  const squares = getNoOfSquare(level);
  const size = getCellSize(level);
  const width = (getCellSize(level) + 1) * getNoOfColumns(level) + 4;

  const [playRightMoveSound] = useSound(rightSound, {
    soundEnabled: isSoundEnabled,
  });
  const [playGameWinSound] = useSound(gameWinSound, {
    soundEnabled: isSoundEnabled,
  });
  const [playGameOverSound] = useSound(gameOver, {
    soundEnabled: isSoundEnabled,
  });
  const [playPlaceFlagSound] = useSound(placeFlagSound, {
    soundEnabled: isSoundEnabled,
  });

  const [currentClickCellId, setCurrentClick] = useState(-1);

  useEffect(() => {
    let found = 0;
    let flag = 0;
    let lost = false;
    let minesFound = 0;
    for (let row of board) {
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

    if (lost === true && minesFound < noOfBombs) {
      setBoard((prevBoard) => showAllMines(prevBoard));
    } else if (lost === true) {
      playGameOverSound();
      gameOverFn();
      getAlertBox(false, "Game Over", restartFn);
    } else if (found === squares - noOfBombs && flag === noOfBombs) {
      playGameWinSound();
      gameOverFn()
      getAlertBox(true, "Congratulation! You Won", restartFn);
    }
    setNoOflags(getNoOfFlag(level) - flag);
  }, [board]);

  const handleRightClick = (id) => {
    if (isGameOver) return;

    const row = Math.floor(id / columns);
    const col = id % columns;

    if (board[row][col].isVisible) return;
    if (!board[row][col].isFlag && noOfFlags <= 0) return;

    setBoard((prevBoard) => {
      let newBoard = new Array(rows);
      for (let i = 0; i < rows; i++) {
        newBoard[i] = [];
        for (let j = 0; j < columns; j++) {
          newBoard[i].push({
            ...prevBoard[i][j],
            isFlag:
              i === row && j === col
                ? !prevBoard[i][j].isFlag
                : prevBoard[i][j].isFlag,
          });
        }
      }
      return newBoard;
    });

    playPlaceFlagSound();
  };

  const handleClick = (id) => {
    if (isGameOver) return;

    const row = Math.floor(id / columns);
    const col = id % columns;

    if (board[row][col].isFlag || board[row][col].isVisible) return;

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
      if (board[x][y].val === 0) {
        for (let i = 0; i < 8; i++) {
          const xi = x + dx[i];
          const yi = y + dy[i];
          if (xi >= 0 && yi >= 0 && xi < rows && yi < columns) {
            if (
              !tmp.some((ele) => ele.x === xi && ele.y === yi) &&
              board[xi][yi].val !== -1 &&
              !board[xi][yi].isFlag
            ) {
              arr.push({ x: xi, y: yi });
              tmp.push({ x: xi, y: yi });
            }
          }
        }
      }
    }
    setBoard((prevBoard) => {
      let newBoard = new Array(rows);
      for (let i = 0; i < rows; i++) {
        newBoard[i] = [];
        for (let j = 0; j < columns; j++) {
          if (tmp.some((element) => element.x === i && element.y === j)) {
            newBoard[i].push({
              ...prevBoard[i][j],
              isVisible: true,
              isFlag: false,
            });
          } else {
            newBoard[i].push({ ...prevBoard[i][j] });
          }
        }
      }
      return newBoard;
    });

    playRightMoveSound();
  };

  return !level ? null : (
    <>
      <Header
        width={width}
        level={level}
        noOfFlags={noOfFlags}
        getDifficultyMenu={restartFn}
        isSoundEnabled={isSoundEnabled}
        setIsSoundEnabled={setIsSoundEnabled}
      />
      <Grid container>
        <Grid item>
          <table>
            <tbody>
              {board.map((item, _) => (
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
