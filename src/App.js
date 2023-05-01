import { useReducer } from "react";
import Board from "../src/components/board";
import Header from "../src/components/header";

import reducerFn, { initStateFn } from "./utilFunctions/reducer";

const App = () => {
  console.log("APP RENDER");
  const [state, dispatch] = useReducer(reducerFn, "Hard", initStateFn);

  const isMobile = window.innerWidth < 720;

  return (
    <div
      style={{
        width: "100%",
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isMobile ? "white" : "#1a1e23",
      }}
    >
      <div>
        <Header state={state} dispatch={dispatch} />
        <Board state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default App;
