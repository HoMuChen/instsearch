import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
} from '@material-ui/core';

import {
  Portlet,
  PortletContent,
  PortletFooter,
  SearchInput,
  TagsInput,
} from 'components/Commons';

const styles = (theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  portletFooter: {
    display: 'flex',
    flexFlow: 'row-reverse',
  }
})

class MediaSearchPanel extends React.Component {
  handleKeywordsChange = (e) => {
    this.props.onKeywordsChange(e.target.value);
  }

  handleTagsChange = (tags) => {
    this.props.onTagsChange(tags);
  }

  handleSortChange = (e, value) => {
    this.props.onSortChange(value);
  }

  handleSearch = () => {
    this.props.onSearch();
  }

  render() {
    const {
      classes,
      keywords,
      sort,
      tags,
    } = this.props;

    return (
      <Portlet>
        <PortletContent>
          <Grid container>
            <Grid item xs={1} className={classes.label}>
              <Typography variant='subtitle2'>
                搜尋:
              </Typography>
            </Grid>
            <Grid item xs={11}> 
              <SearchInput onChange={this.handleKeywordsChange} />
            </Grid>
          <Grid item xs={1} className={classes.label}>
            <Typography variant='subtitle2'>
              排序:
            </Typography>
          </Grid>
            <Grid item xs={11}>
              <RadioGroup aria-label="sort" name="sort" value={sort} onChange={this.handleSortChange} row>
                <FormControlLabel
                  value="tm"
                  control={<Radio color="primary" />}
                  label="時間"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="like_count"
                  control={<Radio color="primary" />}
                  label="按讚數"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="comment_cout"
                  control={<Radio color="primary" />}
                  label="回覆數"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={1} className={classes.label}>
              <Typography variant='subtitle2'>
                #tags:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TagsInput
                tags={tags}
                onChange={this.handleTagsChange}
              />
            </Grid>
          </Grid>
        </PortletContent>
        <PortletFooter noDivider className={classes.portletFooter}>
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={this.handleSearch}
          >
            Search
          </Button>
        </PortletFooter>
      </Portlet>
    )
  }
}

MediaSearchPanel.propTypes = {
  keywords:           PropTypes.string,
  sort:               PropTypes.string,
  tags:               PropTypes.array,
  onKeywordsChange:   PropTypes.func,
  onTagsChange:       PropTypes.func,
  onSortChange:       PropTypes.func,
  onSearch:           PropTypes.func,
}

MediaSearchPanel.defaultProps = {
  keywords: '',
  sort: 'tm',
  tags: [],
  onKeywordsChange: () => {},
  onTagsChange: () => {},
  onSortChange: () => {},
  onSearch: () => {},
}

export default withStyles(styles)(MediaSearchPanel);
