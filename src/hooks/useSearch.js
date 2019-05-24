import { useState, useEffect } from 'react';
import axios from 'axios'

function useSearch({ endpoint, body }) {
  const [ config, setConfig ] = useState(body);
  const [ data, setData ] = useState({ hits: { total: 0, hits: [] }, aggs: {} });
  const [ isFetching, setIsFetching ] = useState(true);

  useEffect(() => {
    axios({
      method: 'POST',
      url: endpoint,
      data: body,
    })
      .then(_ => _.data)
      .then(docs => {
        setData(docs);
        setIsFetching(false);
      })

  }, [ config ]);

  function doSearch(body) {
    setIsFetching(true);
    setConfig(body);
  }

  return { data, isFetching, doSearch };
}

export default useSearch;
