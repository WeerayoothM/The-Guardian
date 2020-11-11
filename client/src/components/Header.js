import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Header() {
  return (
    <div className="header">
      <p className="header-category">
        <Link to="/sections/business">Business</Link> |{' '}
        <Link to="/sections/weather">Weather</Link> |{' '}
        <Link to="/sections/sport">Sport</Link> |{' '}
        <Link to="/sections/politics">Politics</Link>
      </p>
      <Link to="/">
        <h1>The Guardian.</h1>
      </Link>
      <p className="header-date">{moment().format('dddd MMMM Do YYYY')}</p>
    </div>
  );
}
