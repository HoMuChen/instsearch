import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip, Coord } from 'bizcharts';

class HorizontalBarChart extends Component {
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
        <Coord transpose />
        <Axis name={x} />
        <Tooltip />
        <Geom type="interval" position={`${x}*${y}`} size={10} color={x} />
      </Chart>
    )
  }
}

HorizontalBarChart.propTypes = {
  data:    PropTypes.array.isRequired,
}

HorizontalBarChart.defaultProps = {
  data:        [],
  height:      400,
  padding:     [20, 60, 60, 90],
}
export default HorizontalBarChart;
