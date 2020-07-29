import React from 'react';

import './Flag.scss';

const Flag = ({flag, name, id, onSelect, selected}) => {

  const handleClick = () => {
    onSelect(name);
   }

  const style = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${flag})`
  };

  const classNames = selected ? 'flag selected' : 'flag';

  return (
    <div className={classNames} style={style} onClick={handleClick}>
      {name}
    </div>

  );
}

export default Flag;


