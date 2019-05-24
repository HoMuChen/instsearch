import React from 'react';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components/Commons';
import HorizontalBarChart from 'components/Charts/HorizontalBarChart';

function TagsCount({ data }) {
  return (
    <Portlet
    >
      <PortletHeader noDivider>
        <PortletLabel title="#tags排行 - 近7天" />
      </PortletHeader>
      <PortletContent>
        <HorizontalBarChart
          data={data}
          x='tag'
          y='count'
          padding={[20, 60, 60, 100]}
        />
      </PortletContent>
    </Portlet>
  );
}

export default TagsCount;
