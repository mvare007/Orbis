import React, { Component }  from 'react';
import Clock from 'react-live-clock';

class worldClock extends Component {
  render() {
    return(
      <Clock format={'HH:mm:ss'} ticking={true} timezone={this.props.timezone} />
    )
  }
}

export default worldClock;
