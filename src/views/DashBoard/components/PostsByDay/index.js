import React from 'react';
import { DateTime } from 'luxon';
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
import BarChart from 'components/Charts/BarChart';

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
    count_by_day: {
      date_histogram: {
        field: 'tm',
        interval: 'day',
        time_zone: '+08:00',
      }
    }
  }
})

function PostsByDay({}) {
    const { data, isFetching, doSearch } = useSearch({
      endpoint: '/ig-medias/_search',
      body: esQuery(),
    })

    const barData = isFetching
      ? []
      : data
         .aggregations.count_by_day
         .buckets.map(bucket => ({
           date: DateTime.fromMillis(bucket.key).toFormat('MM/dd'),
           count: bucket.doc_count,
         }))

    return (
      <Portlet
      >
        <PortletHeader noDivider>
          <PortletLabel title="每日貼文數 - 近7天" />
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
          <BarChart
            data={barData}
            x='date'
            y='count'
          />
        </PortletContent>
      </Portlet>
    );
}

export default PostsByDay;
