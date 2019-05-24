import { now, nDaysAgo } from 'common/time';

const query = () => {
  return {
    query: {
      range: {
        tm: {
          lt: now(),
          gt: nDaysAgo(30),
        }
      }
    },
    track_total_hits: true,
    _source: false,
  }
};

export default query;

