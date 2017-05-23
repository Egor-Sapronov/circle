import React, { Component } from 'react';
import PropTypes from 'prop-types';

const circleRadius = 150;

class Circle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayRadius: 0,
      color: 'black'
    };
  }

  componentDidReceivedProps() {

  }

  saveOffset = (element) => {
    const rect = element.getBoundingClientRect();

    this.offsetX = rect.left;
    this.offsetY = rect.top;
  }

  invalidateX = (x) =>  {
    return x - this.offsetX - this.props.radius;
  }

  invalidateY = (y) => {
    return y - this.offsetY - this.props.radius;
  }

  invalidateColor(color) {
    this.setState({
      color,
    });
  }

  calculateOverlayRadius(x, y) {
    const minRadius = (this.props.radius / this.props.steps.length) / 2;
    const invalidatedX = this.invalidateX(x);
    const invalidatedY = this.invalidateY(y);

    const nextRadius = Math.sqrt(
      invalidatedX*invalidatedX + invalidatedY*invalidatedY
    );

    if (nextRadius <= this.props.radius) {
      this.setState({
        overlayRadius: nextRadius < minRadius ? minRadius : nextRadius
      }, () => {
        console.log(this.state.overlayRadius)
      });
    }
  }

  renderItem = (step, index) => {
    const stepLength = this.props.radius / this.props.steps.length

    return (
      <circle
        key={index}
        r={this.props.radius - stepLength * index }
        cx={this.props.radius + 0.5}
        cy={this.props.radius + 0.5}
        stroke="gray"
        fill="white"
      />
    );
  }

  render() {
    return (
      <svg
        ref={this.saveOffset}
        height={this.props.radius * 2 + 1}
        width={this.props.radius * 2 + 1}
        onMouseMove={event => this.calculateOverlayRadius(event.clientX, event.clientY)}
      >
        { this.props.steps.map(this.renderItem) }
        <circle
          fill="black"
          r={this.state.overlayRadius}
          cx={this.props.radius + 0.5}
          cy={this.props.radius + 0.5}
        />
      </svg>
    );
  }
}

Circle.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  radius: PropTypes.number,
}

Circle.defaultProps = {
  radius: 150,
};

export default Circle;
