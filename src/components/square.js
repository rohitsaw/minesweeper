import { useEffect, useState } from "react";
import { getBackGroudColor, getColor } from "../utilFunctions/utils.js";

function Square({
  id,
  val,
  isVisible,
  handlLeftClick,
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
  }, [isVisible, isFlag]);

  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
    if (val === 0) return "";
    const color = getColor(val);
    return <span style={{ color: color, fontWeight: 700 }}>{val}</span>;
  };

  const renderFlag = () => {
    const flag = "🚩";
    return flag;
  };

  const handleContextMenuClick = (e, id) => {
    e.preventDefault();
    handleRightClick(id);
  };

  const handleClick = (e, id) => {
    handlLeftClick(id);
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
    <td
      key={id}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "0.5px solid black",
      }}
      onClick={(e) => handleClick(e, id)}
      onContextMenu={(e) => handleContextMenuClick(e, id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
    >
      {isVisible ? renderValue() : isFlag ? renderFlag() : ""}
    </td>
  );
}

export default Square;
