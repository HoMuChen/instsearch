import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class BarChart extends Component {
  render() {
    const { 
      data,
      x,
      y,
      height,
      padding,
    } = this.props;

    return (
      <Chart height={height} data={data} padding={padding} forceFit>
        <Axis name={x} />
        <Axis name={y} />
        <Tooltip />
        <Geom type="interval" position={`${x}*${y}`} />
      </Chart>
    )
  }
}

BarChart.propTypes = {
  data:        PropTypes.array.isRequired,
  x:           PropTypes.string.isRequired,
  y:           PropTypes.string.isRequired,
  height:      PropTypes.number,
}

BarChart.defaultProps = {
  data:        [],
  height:      400,
  padding:     [20, 60, 60, 70],
}

export default BarChart;
