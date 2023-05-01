import { useReducer } from "react";
import Board from "../src/components/board";
import Header from "../src/components/header";

import reducerFn, { initStateFn } from "./utilFunctions/reducer";

const App = () => {
  console.log("APP RENDER");
  const [state, dispatch] = useReducer(reducerFn, "Hard", initStateFn);

  return (
    <>
      <Header state={state} dispatch={dispatch} />
      <Board state={state} dispatch={dispatch} />;
    </>
  );
};

export default App;
