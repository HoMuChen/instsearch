import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

import { Paper } from '@material-ui/core';

import styles from './styles';

const data = [
  { genre: '2019/05/10', sold: 275, income: 2300 },
  { genre: '2019/05/11', sold: 115, income: 667 },
  { genre: '2019/05/12', sold: 120, income: 982 },
  { genre: '2019/05/13', sold: 350, income: 5271 },
  { genre: '2019/05/14', sold: 300, income: 3710 },
  { genre: '2019/05/15', sold: 240, income: 3710 },
  { genre: '2019/05/16', sold: 150, income: 3710 },
];

const cols = {
  sold: { alias: '销售量', max: 400 },
  genre: { alias: '日期' }
};

class LineChart extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="genre" title/>
          <Axis name="sold" title/>
          <Legend position="top" dy={-20} />
          <Tooltip />
          <Geom type="interval" position="genre*sold" size={10} style={{ fill: '#0767DB' }}/>
        </Chart>
      </Paper>
    )
  }
}

export default withStyles(styles)(LineChart);
