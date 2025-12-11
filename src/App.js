import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News'
import NewsWrapper from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoadingBar from './components/TopLoadBar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <BrowserRouter>
      <NavBar/>
      {/* <LoadingBar/> */}

      <Routes>
          <Route path="/" element={<News apiKey={this.apiKey} key="Home" category="top" country="in"/>} />
          <Route path="/Business" element={<News apiKey={this.apiKey} key="Business" category="business"/>} />
          <Route path="/Entertainment" element={<News apiKey={this.apiKey} key="Entertainment" category="entertainment"/>} />
          <Route path="/top" element={<News apiKey={this.apiKey} key="General" category="top"/>} />
          <Route path="/Health" element={<News apiKey={this.apiKey} key="Health" category="health"/>} />
          <Route path="/Science" element={<News apiKey={this.apiKey} key="Science" category="science"/>} />
          <Route path="/Sports" element={<News apiKey={this.apiKey} key="Sports" category="sports"/>} />
          <Route path="/Technology" element={<News apiKey={this.apiKey} key="Technology" category="technology"/>} />
          <Route path="/country/:code" element={<NewsWrapper apiKey={this.apiKey} key="country" category="top" />} />
        </Routes>
        </BrowserRouter>

    )
  }
}
