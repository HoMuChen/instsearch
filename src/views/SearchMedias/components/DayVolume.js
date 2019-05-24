import React from 'react';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components/Commons';
import BarChart from 'components/Charts/BarChart';

function DayVolume({ data }) {
  return (
    <Portlet
    >
      <PortletHeader noDivider>
        <PortletLabel title="每日貼文數 - 近7天" />
      </PortletHeader>
      <PortletContent>
        <BarChart
          data={data}
          x='date'
          y='count'
        />
      </PortletContent>
    </Portlet>
  );
}

export default DayVolume;
