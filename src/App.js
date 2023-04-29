import { useCallback, useEffect, useState } from "react";
import Board from "../src/components/board";

import { startGame } from "./components/modal";
import { getNoOfBomb, getNoOfFlag } from "./utilFunctions/utils";
import getBoard from "./utilFunctions/getBoard.js";

const App = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [level, setDifficulty] = useState("Hard");
  const [noOfFlags, setNoOflags] = useState(getNoOfFlag(level));
  const [noOfBombs, setNoOfBombs] = useState(getNoOfBomb(level));
  const [board, setBoard] = useState([[]]);

  const [isGameOver, setGameOver] = useState(false);

  const getDifficultyMenu = useCallback(() => {
    startGame().then((result) => {
      setDifficulty(result);
      if (level === result) setGameOver(false);
    });
  }, []);

  useEffect(() => getDifficultyMenu(), [getDifficultyMenu]);

  useEffect(() => {
    setNoOflags(getNoOfFlag(level));
    setNoOfBombs(getNoOfBomb(level));
    setBoard(getBoard(level));
  }, [level]);

  useEffect(() => {
    if (!isGameOver) {
      setNoOflags(getNoOfFlag(level));
      setNoOfBombs(getNoOfBomb(level));
      setBoard(getBoard(level));
    }
  }, [isGameOver]);

  const gameOverFn = () => setGameOver(true);

  return (
    <Board
      level={level}
      board={board}
      setBoard={setBoard}
      noOfFlags={noOfFlags}
      setNoOflags={setNoOflags}
      noOfBombs={noOfBombs}
      isGameOver={isGameOver}
      isSoundEnabled={isSoundEnabled}
      setIsSoundEnabled={setIsSoundEnabled}
      restartFn={getDifficultyMenu}
      gameOverFn={gameOverFn}
    />
  );
};

export default App;
