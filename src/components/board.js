import { useEffect, useState } from "react";
import Square from "./square";

import getBoard from "../utilFunctions/getBoard.js";
import { getAlert as getAlertBox } from "./modal.js";
import {
  getNoOfRows,
  getNoOfColumns,
  getNoOfSquare,
  getNoOfFlag,
  getCellSize,
} from "../utilFunctions/utils.js";
import Grid from "@mui/material/Grid";

function Board({
  level,
  getDifficultyMenu,
  setNoOflags,
  noOfFlags,
  noOfBombs,
}) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(getBoard(level));
  }, [level]);

  const rows = getNoOfRows(level);
  const columns = getNoOfColumns(level);
  

  useEffect(() => {
    const squares = getNoOfSquare(level);
    let found = 0;
    let flag = 0;
    for (let row of board) {
      for (let each of row) {
        if (each.isFlag) {
          flag += 1;
        }
        if (each.val === -1 && each.isVisible) {
          getAlertBox(false, "Game Over", () => {
            getDifficultyMenu();
            setBoard(getBoard(level));
          });
        } else if (each.val !== -1 && each.isVisible) {
          found += 1;
        }
      }
    }
    if (found === squares - noOfBombs && flag === noOfBombs) {
      getAlertBox(true, "Congratulation! You Won", () => {
        getDifficultyMenu();
        setBoard(getBoard(level));
      });
    }
    setNoOflags(getNoOfFlag(level) - flag);
  }, [board, getDifficultyMenu, level, noOfBombs, setNoOflags]);

  const handleRightClick = (id) => {
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
  };

  const handleClick = (id) => {
    const row = Math.floor(id / columns);
    const col = id % columns;

    if (board[row][col].isFlag) return;

    const dx = [0, 0, -1, 1, -1, -1, 1, 1];
    const dy = [1, -1, 0, 0, -1, 1, -1, 1];

    let arr = [];
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
              board[xi][yi].val !== -1
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
  };

  const width = (getCellSize(level) + 1) * getNoOfColumns(level) + 18;
  const size = getCellSize(level);

  return !level ? null : (
    <Grid container spacing={2}>
      <Grid item width={width}>
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
  );
}

export default Board;
