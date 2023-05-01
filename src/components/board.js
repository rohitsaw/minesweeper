import Square from "./square";
import useSound from "use-sound";

import { getNoOfColumns, getCellSize } from "../utilFunctions/utils.js";
import Grid from "@mui/material/Grid";

import rightSound from "../assets/right.wav";
import gameWinSound from "../assets/gameWin.wav";
import gameOver from "../assets/gameOver.wav";
import placeFlagSound from "../assets/placeFlag.wav";

import {
  placeFlagFunction,
  handleClick as handleClickInAction,
} from "../utilFunctions/action.js";

function Board({ state, dispatch }) {
  const columns = getNoOfColumns(state.level);
  const size = getCellSize(state.level);

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

  const handleRightClick = (id) => {
    placeFlagFunction(id, state, dispatch, playPlaceFlagSound);
  };

  const handleClick = (id) => {
    handleClickInAction(
      id,
      state,
      dispatch,
      playRightMoveSound,
      playGameOverSound,
      playGameWinSound
    );
  };

  return (
    <Grid container>
      <Grid item>
        <table>
          <tbody>
            {state.board.map((item, index) => (
              <tr key={index} style={{ display: "flex" }}>
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
                    isCurrentClickCellId={state.currentClickCellId === each.id}
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
