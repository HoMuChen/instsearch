import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { withStyles } from '@material-ui/core';
import {
  Typography,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TablePagination,
} from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
} from 'components/Commons';

import styles from './styles';

const MediaList = props => {
  const { classes, className, totalCount, data, page, rowsPerPage, highlightedTags } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <Portlet className={rootClassName}>
      <PortletHeader>
        <PortletLabel title="文章列表" />
      </PortletHeader>
      <PortletContent>
        <List>
        {
          data.map((hit, i) => (
            <React.Fragment key={hit.url}>
              <ListItem alignItems="flex-start" disableGutters={true}>
                <ListItemAvatar>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={hit.url}
                    className={classes.link}
                  >
                    <Avatar alt="Remy Sharp" src={hit.image_url}/>
                  </a>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <a
                       target="_blank"
                       rel="noopener noreferrer"
                       href={`https:\/\/instagram.com/explore/locations/${hit.location_id}`}
                       className={classes.link}
                    >
                      <Typography variant="h5">{hit.location_name}</Typography>
                    </a>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography className={classes.tm}>
                        { DateTime.fromSeconds(hit.tm).toFormat('FF') }
                      </Typography>
                      <Typography className={classes.description}>
                        { hit.description }
                      </Typography>
                      <Typography className={classes.tm}>
                        { `${hit.like_count}個讚, ${hit.comment_cout}則評論` }
                      </Typography>
                      <div className={classes.tagsWrapper}>
                        {
                          hit.tags.map((tag, i) => 
                            <Chip
                              key={i}
                              color="primary"
                              variant={highlightedTags.includes(tag)? "text": "outlined"}
                              label={tag}
                              className={classes.chip}
                            />
                          )
                        }
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              { i !== data.length-1 && <Divider variant="inset" component="li" /> }
            </React.Fragment>
          ))
        }
        </List>
      </PortletContent>
      <PortletFooter className={classes.portletFooter}>
        <TablePagination
          count={totalCount}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          page={page}
          onChangePage={props.onChangePage}
        />
      </PortletFooter>
    </Portlet>
  );
};

MediaList.propTypes = {
  className:       PropTypes.string,
  classes:         PropTypes.object.isRequired,
  data:            PropTypes.array.isRequired,
  page:            PropTypes.number.isRequired,
  rowsPerPage:     PropTypes.number.isRequired,
  onChangePage:    PropTypes.func.isRequired,
  highlightedTags: PropTypes.array,
};

MediaList.defaultProps = {
  data:            [],
  totalCount:      0,
  page:            0,
  rowsPerPage:     15,
  highlightedTags: [],
  onChangePage:    () => {},
}

export default withStyles(styles)(MediaList);
