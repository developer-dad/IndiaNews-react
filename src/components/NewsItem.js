import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, publishedAt, source } = this.props;

    return (
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            className="btn btn-secondary"
          >
            Read More
          </a>
          <p class="card-text mt-2">
            <small class="text-body-secondary">
              By {author} on {publishedAt}
            </small>
          </p>
          <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {source}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
      </div>
    );
  }
}

export default NewsItem;
