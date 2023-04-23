import { useEffect, useState } from "react";
import Board from "../src/components/board";

import { startGame } from "./components/modal";
import Header from "./components/header";
import { getNoOfBomb, getNoOfFlag } from "./utilFunctions/utils";

const App = () => {
  const [difficultyLevel, setDifficulty] = useState("Hard");
  const [noOfFlags, setNoOflags] = useState(getNoOfFlag(difficultyLevel));
  const [noOfBombs, setNoOfBombs] = useState(getNoOfBomb(level));

  useEffect(() => {
    getDifficultyMenu();
  }, []);

  useEffect(() => {
    setNoOflags(getNoOfFlag(difficultyLevel));
    setNoOfBombs(getNoOfBomb(difficultyLevel));
  }, [difficultyLevel]);

  const getDifficultyMenu = () => {
    startGame().then((result) => {
      setDifficulty(result);
    });
  };

  return (
    <>
      <Header
        level={difficultyLevel}
        noOfFlags={noOfFlags}
        getDifficultyMenu={getDifficultyMenu}
      />
      <Board
        level={difficultyLevel}
        getDifficultyMenu={getDifficultyMenu}
        setNoOflags={setNoOflags}
        noOfFlags={noOfFlags}
        noOfBombs={noOfBombs}
      />
    </>
  );
};

export default App;
