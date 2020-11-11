import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [orderBy, setOrderBy] = useState('newest');

  useEffect(() => {
    fetchArticles();
  }, [page, orderBy]);

  useEffect(() => {
    const timeOutId = setTimeout(() => fetchArticles(), 500);
    return () => clearTimeout(timeOutId);
  }, [term]);

  const searchTerm = (e) => {
    setPage(1);
    setTerm(e.target.value);
  };

  const fetchArticles = () => {
    console.log('fetching data');
    const termQuery = term ? `&q=${term}` : '';
    const orderByQuery = `&orderBy=${orderBy}`;
    setLoading(true);
    axios
      .get(`/api/articles?page=${page}${termQuery}${orderByQuery}`)
      .then((res) => {
        setArticles(res.data.articles);
        setLastPage(res.data.pages);
        setLoading(false);
      });
  };

  const displayArticles = () => {
    return articles.map((article) => (
      <div key={article.id} className="column">
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
    ));
  };
  const firstPage = (e) => {
    e.preventDefault();
    setPage(1);
  };
  const prevPage = (e) => {
    e.preventDefault();
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  const nextPage = (e) => {
    console.log('nextpage');

    e.preventDefault();
    if (page === lastPage) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="body">
      <div className="subhead">
        <div className="subhead-prev-group">
          <a href="" onClick={firstPage}>
            First page
          </a>
          {'  |  '}
          <a href="" onClick={prevPage}>
            Previous page
          </a>
        </div>
        <div className="search-form">
          <label htmlFor="search">Search </label>
          <input
            id="search"
            type="text"
            value={term}
            onChange={searchTerm}
          />{' '}
          <span
            onClick={() => setOrderBy('newest')}
            className={orderBy === 'newest' ? 'active' : ''}
          >
            Newest
          </span>{' '}
          |{' '}
          <span
            onClick={() => setOrderBy('oldest')}
            className={orderBy === 'oldest' ? 'active' : ''}
          >
            Oldest
          </span>
        </div>
        <div className="subhead-next-group">
          <a href="" onClick={nextPage}>
            Next page
          </a>
          {'  |  '}
          <span>On Page {page}</span>
        </div>
      </div>
      <div className="content">
        {loading ? (
          <div className="loader">
            <img src="./loader.gif" />
          </div>
        ) : (
          displayArticles()
        )}
      </div>
    </div>
  );
}
