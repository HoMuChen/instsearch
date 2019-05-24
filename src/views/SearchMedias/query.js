import { now, nDaysAgo } from 'common/time';
import { genMatchAry, genRangeAry } from 'common/es';

const query = ({ keywords, sort, tags, page, size }) => {
  return {
    query: {
      bool: {
        must: genMatchAry('description', keywords)
                .concat(
                  genRangeAry({ to: now(), from: nDaysAgo(7) })
                )
                .concat(
                  genMatchAry('tags', tags)
                )
      }
    },
    sort: {
      [sort]: 'desc'
    },
    from: page*size,
    size: size,
    aggs: {
      count_by_day: {
        date_histogram: {
          field: 'tm',
          interval: 'day',
          time_zone: "+08:00"
        }
      },
      count_by_tags: {
        terms: {
          field: 'tags',
        }
      },
    },
    _source: {
      includes: [ 'url', 'description', 'tm', 'image_url', 'like_count', 'comment_cout', 'location_name', 'tags', 'owner_id', 'location_id' ]
    }
  }
};

export default query;

