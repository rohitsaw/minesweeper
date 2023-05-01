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
    currentClickCellId: -1,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case "toggleSound":
      return {
        ...state,
        isSoundEnabled: !state.isSoundEnabled,
      };
    case "setLevel":
      return !state.isGameOver && action.payload === state.level
        ? state
        : {
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
        noOfFlags: state.noOfFlags + action.payload,
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
    case "setCurrentClickCellId":
      return {
        ...state,
        currentClickCellId: action.payload,
      };
    default:
      return state;
  }
}
