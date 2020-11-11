import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Details(history) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const url = history.location.search.split('=')[1];
    axios.get(`/api/details?url=${url}`).then((response) => {
      console.log('response.data', response.data);
      setDetails(response.data);
    });
  }, []);

  return details ? (
    <div>
      <div className="details-header">
        <p className="left">{details.sectionName}</p>
        <h1> {details.webTitle}</h1>
        <p className="right">{details.fields.byline}</p>
      </div>
      <div
        className="details-columns"
        dangerouslySetInnerHTML={{
          __html: details && details.fields.main + details.fields.body,
        }}
      ></div>
    </div>
  ) : (
    <div className="loader">
      <img src="./loader.gif" />
    </div>
  );
}
