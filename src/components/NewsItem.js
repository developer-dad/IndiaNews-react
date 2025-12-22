import { Component } from "react";
import "./css/NewsItem.css";

export class NewsItem extends Component {
  formatDate(dateString) {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { title, description, imageUrl, url, author, publishedAt, source, content } = this.props;
    this.props.onOpenModal({
      title,
      description,
      imageUrl,
      url,
      author,
      publishedAt,
      source,
      content
    });
  };

  render() {
    let { title, description, imageUrl, author, publishedAt, source } = this.props;

    return (
      <article className="news-card" onClick={this.handleClick}>
        <div className="card-link">
          <div className="card-image-wrapper">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="image-overlay"></div>
            {source && (
              <span className="source-badge">{source}</span>
            )}
          </div>
          
          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            
            <div className="card-footer">
              <div className="author-info">
                <div className="author-avatar">
                  {author.charAt(0).toUpperCase()}
                </div>
                <div className="author-details">
                  <span className="author-name">{author}</span>
                  <span className="publish-time">{this.formatDate(publishedAt)}</span>
                </div>
              </div>
              
              <div className="read-more">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default NewsItem;