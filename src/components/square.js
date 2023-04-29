import { useEffect, useState } from "react";

function getBackGroudColor({ row, column }, val, isVisible, isFlag) {
  if (isVisible) {
    if (val === -1 && isFlag) return "#F23506";
    else if (row & 1) return column % 2 === 0 ? "#D7B899" : "#E4C29E";
    else return column % 2 !== 0 ? "#D7B899" : "#E4C29E";
  } else {
    if (row & 1) return column % 2 === 0 ? "#A6D948" : "#8DCB3A";
    else return column % 2 !== 0 ? "#A6D948" : "#8DCB3A";
  }
}

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
}) {
  const [backgroundColor, setBackGroudColor] = useState(
    getBackGroudColor({ row, column }, val, isVisible, isFlag)
  );

  useEffect(() => {
    setBackGroudColor(
      getBackGroudColor({ row, column }, val, isVisible, isFlag)
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
      getBackGroudColor({ row, column }, val, isVisible, isFlag)
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
