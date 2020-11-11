import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Header() {
  return (
    <div className="header">
      <p className="header-category">
        World's leading liberal voicess | <Link to="/sections">Sections</Link>
      </p>
      <Link to="/">
        <h1>The Guardian.</h1>
      </Link>
      <p className="header-date">{moment().format('dddd MMMM Do YYYY')}</p>
    </div>
  );
}
