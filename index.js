const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5000;
const KEY = process.env.GUARDIAN_API_KEY;
const publicPath = path.join(__dirname, 'client', 'build');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

// GET All articles
app.get('/api/articles', async (req, res) => {
  const querySection = req.query.section ? `&section=${req.query.section}` : '';
  const q = req.query.q || '';
  const orderBy = req.query.orderBy || 'newest';
  const page = req.query.page || 1;
  try {
    const baseUrl =
      'https://content.guardianapis.com/search?show-fields=trailText,thumbnail,firstPublicationDate,wordcount';
    const response = await axios.get(
      `${baseUrl}&api-key=${KEY}&page=${page}&order-by=${orderBy}&page-size=12&q=${q}&query-fields=trailText,headline${querySection}`
    );
    const articles = response.data.response.results;
    const pages = response.data.response.pages;
    res.send({ pages, articles });
  } catch (err) {
    console.error(err);
  }
});

//Get specific article
app.get('/api/details', async (req, res) => {
  const baseUrl = 'https://content.guardianapis.com/';
  const url = req.query.url;
  try {
    const response = await axios.get(
      `${baseUrl}${url}?api-key=${KEY}&show-fields=all`
    );
    const content = response.data.response.content;
    res.send(content);
  } catch (err) {
    console.error(err);
  }
});

//Get list all all sections
app.get('/api/sections', async (req, res) => {
  const baseUrl = 'https://content.guardianapis.com/sections';
  try {
    const response = await axios.get(
      `${baseUrl}?api-key=${KEY}&show-fields=all`
    );
    const sections = response.data.response.results;
    res.send(sections);
  } catch (err) {
    console.error(err);
  }
});

//Serving Build folder for deployment
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log('Server is running on port ' + port));
