import { useCallback, useReducer } from "react";
import Board from "../src/components/board";

import { startGame } from "./components/modal";
import reducerFn, { initStateFn } from "./utilFunctions/reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducerFn, "Hard", initStateFn);

  const getDifficultyMenu = useCallback(() => {
    startGame().then((result) => {
      dispatch({ type: "setLevel", payload: result });
    });
  }, []);

  return (
    <Board state={state} dispatch={dispatch} restartFn={getDifficultyMenu} />
  );
};

export default App;
