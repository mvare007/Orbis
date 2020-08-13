import React, { Component } from "react";
import range from "lodash.range";
import { scaleSymlog } from "d3-scale";
import { interpolateGnBu } from "d3-scale-chromatic";
import { easeElastic } from "d3-ease";
import { NodeGroup } from "react-move";

const linear = scaleSymlog().domain([0, window.innerWidth ]);

class CircleInferno extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 250, y: 250 };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("touchmove", this.handleTouchMove);
  }

  handleMouseMove({ pageX: x, pageY: y }) {
    this.setState({ x, y });
  }

  handleTouchMove({ touches }) {
    this.handleMouseMove(touches[0]);
  }

  render() {
    return (
      <NodeGroup
        data={range(8).map(d => {
          return {
            key: `key-${d}`,
            x: this.state.x,
            y: this.state.y
          };
        })}
        keyAccessor={d => d.key}
        start={data => {
          return { x: data.x, y: data.y };
        }}
        update={(data, index) => {
          return {
            x: [data.x],
            y: [data.y],
            timing: {
              delay: index * 120,
              duration: 2500,
              ease: easeElastic
            }
          };
        }}
      >
        {nodes => (
          <div>
            {nodes.map(({ key, data, state: { x, y } }, index) => (
              <div
                key={key}
                style={{
                  backgroundColor: interpolateGnBu(linear(x)),
                  backgroundImage: `url(${this.props.country.flag})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '80px 50px',
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  opacity: 0.5,
                  WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 4rem)`,
                  transform: `translate3d(${x - 25}px, ${y - 25}px, 4rem)`,
                  zIndex: nodes.length - index + 200,
                  overflow: 'hidden'
                }}
              />
            ))}
          </div>
        )}
      </NodeGroup>
    );
  }
}

export default CircleInferno;
