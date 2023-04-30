import { getNoOfBomb, getNoOfFlag } from "./utils";
import getBoard from "./getBoard.js";

export function initStateFn(level) {
  return {
    isSoundEnabled: true,
    level: level,
    noOfFlags: getNoOfFlag(level),
    noOfBombs: getNoOfBomb(level),
    board: getBoard(level),
    isGameOver: false,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case "setSoundEnabled":
      return {
        ...state,
        isSoundEnabled: action.payload,
      };
    case "setLevel":
      return {
        ...state,
        level: action.payload,
        noOfFlags: getNoOfFlag(action.payload),
        noOfBombs: getNoOfBomb(action.payload),
        board: getBoard(action.payload),
        isGameOver: false,
      };
    case "setNoOfFlag":
      return {
        ...state,
        noOfFlags: getNoOfFlag(state.level) - action.payload,
      };
    case "setBoard":
      return {
        ...state,
        board: action.payload,
      };
    case "setGameOver":
      return {
        ...state,
        isGameOver: true,
        board: action.payload ?? state.board,
      };
    default:
      return state;
  }
}
