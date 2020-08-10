import React from 'react';

const Introduction = () => {
  const style = {
    backgroundImage: 'radial-gradient(circle, rgba(138,136,133,1) 47%, rgba(112,110,110,1) 50%, rgba(104,105,104,1) 72%, rgba(52,58,64,1) 100%)',
    textAlign: 'center',
    color: '#F2EEE8',
    borderRadius: '60% 60%',
    fontSize: 'calc(4px + 1vw)',
    margin: '0 10px;',
    textShadow: 'text-shadow: 0px 0px 2px #0000;',
    width: '65%'
  };

  return(
    <div style={style}>
      <h3>Welcome To Atlas</h3>
      <br/>
      <p>Get information on any Country about:</p>
      <ol>Time</ol>
      <ol>Weather</ol>
      <ol>Demographics</ol>
    </div>
  );
}

export default Introduction;
