import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Article({ article }) {
  return (
    <div className="column">
      <Link to={`/details?id=${article.id}`}>
        <img src={article.fields.thumbnail}></img>
      </Link>
      <h3 className="headline">{article.webTitle}</h3>
      <p className="subheadline">{article.fields.trailText}</p>
      <div className="column-footer">
        <span>{parseInt(article.fields.wordcount / 130)} minutes read</span>
        <span>
          {article.fields.firstPublicationDate &&
            moment(article.fields.firstPublicationDate).format(
              'dddd MMMM Do YYYY'
            )}
        </span>
      </div>
    </div>
  );
}
