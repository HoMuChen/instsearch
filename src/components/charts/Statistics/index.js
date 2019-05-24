import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { Paper } from '@material-ui/core';

import styles from './styles';

class Statistics extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              { this.props.title }
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              { this.props.prefix }{ this.props.number.toLocaleString() }{ this.props.postfix }
            </Typography>
          </div>
          <div className={classes.iconWrapper} style={{ backgroundColor: this.props.titleIconColor }}>
            { this.props.titleIcon }
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="body2"
          >
            { this.props.subtitle }
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            { this.props.subTitle }
          </Typography>
        </div>
      </Paper>
    );
  }
}

Statistics.propTypes = {
  className:       PropTypes.string,
  classes:         PropTypes.object.isRequired,
  title:           PropTypes.string.isRequired,
  number:          PropTypes.number.isRequired,
  prefix:          PropTypes.string,
  postfix:         PropTypes.string,
  titleIconColor:  PropTypes.string,
};

Statistics.defaultProps = {
  number:          0,
}

export default withStyles(styles)(Statistics);
