import React, { Component } from "react";
import NavBar from "./components/NavBar";
import NewsWrapper from "./components/News";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API4;

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/in/top" />} />

          <Route
            path="/:country/:category"
            element={
              <>
                <NavBar />
                <NewsWrapper apiKey={this.apiKey} />
              </>
            }
          />

          <Route path="*" element={<Navigate to="/in/top" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
