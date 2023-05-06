import { useEffect, useReducer } from "react";
import Board from "../src/components/board";
import Header from "../src/components/header";

import reducerFn, { initStateFn } from "./utilFunctions/reducer";
import { useMediaQuery } from "@mui/material";

const App = () => {
  console.log("APP RENDER");
  const [state, dispatch] = useReducer(reducerFn, "Hard", initStateFn);
  const isMobile = useMediaQuery("(max-width:720px)");

  useEffect(() => {
    dispatch({
      type: "reloadState",
      payload: { isSoundEnabled: state.isSoundEnabled, level: state.level },
    });
  }, [isMobile]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        ...(!isMobile && {
          paddingTop: "10%",
          paddingBottom: "10%",
          backgroundColor: "#1a1e23",
        }),

        backgroundColor: isMobile ? "white" : "#1a1e23",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header state={state} dispatch={dispatch} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Board state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default App;
