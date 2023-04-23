import { useState } from "react";

function Square({
  id,
  val,
  isVisible,
  handleClick,
  handleRightClick,
  isFlag,
  size,
}) {
  const [backgroundColor, setBackGroudColor] = useState("#a5e537");

  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
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
    setBackGroudColor("#c1f765");
  };

  const handleMouseOut = () => {
    setBackGroudColor("#a5e537");
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
      {isFlag ? renderFlag() : isVisible ? renderValue() : ""}
    </div>
  );
}

export default Square;
