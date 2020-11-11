import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './Article';

export default function Sections({ match }) {
  const sectionParam = match.params.section;
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState('politics');
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  const [sectionName, setSectionName] = useState('Politics');

  useEffect(() => {
    setSection(sectionParam);
    setSectionName(sectionParam);
    fetchSections();
  }, [sectionParam]);

  useEffect(() => {
    fetchArticles();
  }, [section]);

  const updateSection = (e) => {
    setSection(e.target.id);
    setSectionName(e.target.innerText);
  };

  const fetchSections = () => {
    axios.get('/api/sections').then((res) => {
      setSections(res.data);
    });
  };

  const fetchArticles = () => {
    const sectionQuery = section ? `&section=${section}` : '';
    setLoading(true);
    axios.get(`/api/articles?${sectionQuery}`).then((res) => {
      setArticles(res.data.articles);
      setLoading(false);
    });
  };

  const displayArticles = () => {
    return articles.map((article) => (
      <Article key={article.id} article={article} />
    ));
  };

  return (
    <div className="sections">
      <div className="sections-index">
        <span>SECTIONS</span>
        <ul>
          {sections &&
            sections.map((section) => (
              <li id={section.id} key={section.id} onClick={updateSection}>
                {section.webTitle}
              </li>
            ))}
        </ul>
      </div>
      <div className="sections-body">
        <h1>{sectionName}</h1>
        <div className="content">
          {loading ? (
            <div className="loader">
              <img src="/loader.gif" />
            </div>
          ) : (
            displayArticles()
          )}
        </div>
      </div>
    </div>
  );
}
