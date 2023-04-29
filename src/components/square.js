import { useEffect, useState } from "react";
import { getBackGroudColor } from "../utilFunctions/utils.js";

function Square({
  id,
  val,
  isVisible,
  handleClick,
  handleRightClick,
  isFlag,
  size,
  row,
  column,
  isCurrentClickCellId,
}) {
  const [backgroundColor, setBackGroudColor] = useState(
    getBackGroudColor(
      { row, column },
      val,
      isVisible,
      isFlag,
      isCurrentClickCellId
    )
  );

  useEffect(() => {
    setBackGroudColor(
      getBackGroudColor(
        { row, column },
        val,
        isVisible,
        isFlag,
        isCurrentClickCellId
      )
    );
  }, [row, column, isVisible, val, isFlag]);

  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
    if (val === 0) return "";
    return val;
  };

  const renderFlag = () => {
    const flag = "🚩";
    return flag;
  };

  const rightClick = (e, id) => {
    e.preventDefault();
    handleRightClick(id);
  };

  const handleMouseEnter = () => {
    if (isVisible) return;
    setBackGroudColor("#a5e537");
  };

  const handleMouseOut = () => {
    if (isVisible) return;
    setBackGroudColor(
      getBackGroudColor(
        { row, column },
        val,
        isVisible,
        isFlag,
        isCurrentClickCellId
      )
    );
  };

  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "0.5px solid black",
      }}
      onClick={() => handleClick(id)}
      onContextMenu={(e) => rightClick(e, id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
    >
      {isVisible ? renderValue() : isFlag ? renderFlag() : ""}
    </div>
  );
}

export default Square;
