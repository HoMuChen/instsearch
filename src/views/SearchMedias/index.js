import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { DateTime } from 'luxon';

import { Dashboard as DashboardLayout } from 'layouts';
import MediaList from 'components/Commons/MediaList';
import useSearch from 'hooks/useSearch';

import MediaSearchPanel from './components/MediaSearchPanel';
import DayVolume from './components/DayVolume';
import TagsCount from './components/TagsCount';

import query from './query';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  }
}));

function SearchMedias() {
  const classes = useStyles();
  const [ config, setConfig ] = useState({ keywords: '', sort: 'tm', page: 0, size: 15, tags: [] });
  const { data, isFetching, doSearch } = useSearch({
    endpoint: '/ig-medias/_search',
    body: query(config),
  })

  function handleKwdsChange(value) {
    setConfig({ ...config, keywords: value });
  }

  function handleSortChange(value) {
    setConfig({ ...config, sort: value });
  }

  function handleTagsChange(value) {
    setConfig({ ...config, tags: value });
  }

  function handlePageChange(e, value) {
    setConfig({ ...config, page: value});
    doSearch(query(config));
  }

  function handleOnSearch() {
    doSearch(query(config));
  }

  const barData = isFetching
    ? []
    : data
       .aggregations.count_by_day
       .buckets.map(bucket => ({
         date: DateTime.fromMillis(bucket.key).toFormat('MM/dd'),
         count: bucket.doc_count,
       }))

  const tagsData = isFetching
    ? []
    : data.aggregations.count_by_tags
       .buckets.map(bucket => ({
         tag: bucket.key,
         count: bucket.doc_count,
       }))

  const hitsData = data.hits.hits.map(hit => hit._source);

  return (
    <DashboardLayout title="Search Medias">
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <MediaSearchPanel
              keywords={config.keywords}
              sort={config.sort}
              tags={config.tags}
              onKeywordsChange={handleKwdsChange}
              onSortChange={handleSortChange}
              onTagsChange={handleTagsChange}
              onSearch={handleOnSearch}
            />
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <DayVolume data={barData} />
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <TagsCount data={tagsData} />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <MediaList
              totalCount={data.hits.total.value || data.hits.total}
              data={hitsData}
              page={config.page}
              rowsPerPage={config.size}
              highlightedTags={config.tags}
              onChangePage={handlePageChange}
            />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
}

export default SearchMedias;
