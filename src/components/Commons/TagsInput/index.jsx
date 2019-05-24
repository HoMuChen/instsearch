import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import {
  Input,
  Chip,
} from '@material-ui/core';

import styles from './styles';

class TagsInput extends React.Component {
  handleDeleteTag = (tag) => () => {
    this.props.onChange(this.props.tags.filter(t => t !== tag));
  }

  handleAddTag = (e) => {
    if (e.key === 'Enter') {
      this.props.onChange([...this.props.tags, e.target.value]);

      e.target.value = '';
    }
  }

  render() {
    const { classes, className, onChange, style, tags, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div
        className={rootClassName}
        style={style}
      >
        <div className={classes.chips}>
        {
          tags.map(tag => (
            <Chip
              key={tag}
              color="primary"
              variant="outlined"
              onDelete={this.handleDeleteTag(tag)}
              label={tag}
              className={classes.chip}
            />
          ))
        }
        </div>
        <Input
          {...rest}
          className={classes.input}
          disableUnderline
          onKeyDown={this.handleAddTag}
        />
      </div>
    );
  }
};

TagsInput.propTypes = {
  className:    PropTypes.string,
  classes:      PropTypes.object.isRequired,
  onChange:     PropTypes.func,
  style:        PropTypes.object,
  tags:         PropTypes.array.isRequired,
};

TagsInput.defaultProps = {
  tags:        [],
  onChange:    () => {}
};

export default withStyles(styles)(TagsInput);
