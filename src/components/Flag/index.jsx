import React from "react";

import "./index.scss";

const Flag = ({ flag, name, onSelect, selected }) => {
  const handleClick = () => {
    onSelect(name);
  };

  const style = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${flag})`,
  };

  const classNames = selected ? "flag selected" : "flag";

  return (
    <div className={classNames} style={style} onClick={handleClick}>
      {name.split("(")[0]}
    </div>
  );
};

export default Flag;
