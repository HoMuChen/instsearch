import React from 'react';
import { IconButton } from '@material-ui/core';

import {
  Refresh as RefreshIcon,
} from '@material-ui/icons';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent
} from 'components/Commons';
import HorizontalBarChart from 'components/Charts/HorizontalBarChart';

import { now, nDaysAgo } from 'common/time';
import useSearch from 'hooks/useSearch';

const esQuery = () => ({
  query: {
    range: {
      tm: {
        lt: now(),
        gt: nDaysAgo(7),
      }
    }
  },
  aggs: {
    count_by_tags: {
      terms: {
        field: 'tags',
      }
    }
  }
})

function TagsCount({...props}) {
    const { data, isFetching, doSearch } = useSearch({
      endpoint: '/ig-medias/_search',
      body: esQuery(),
    });

    const tagsData = isFetching
      ? []
      : data.aggregations.count_by_tags
         .buckets.map(bucket => ({
           tag: bucket.key,
           count: bucket.doc_count,
         }))

    return (
      <Portlet
      >
        <PortletHeader noDivider>
          <PortletLabel title="#tags排行 - 近7天" />
          <PortletToolbar>
            <IconButton
              onClick={() => doSearch(esQuery())}
              variant="text"
            >
              <RefreshIcon />
            </IconButton>
          </PortletToolbar>
        </PortletHeader>
        <PortletContent>
          <HorizontalBarChart
            data={tagsData}
            x='tag'
            y='count'
            padding={[20, 60, 60, 100]}
          />
        </PortletContent>
      </Portlet>
    );
}

export default TagsCount;
