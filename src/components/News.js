import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import NewsModal from "./NewsModal";
import BackToTop from "./BackToTop";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import "./css/News.css";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "business",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      totalResults: 0,
      nextPage: null,
      selectedArticle: null,
    };
    document.title = `IndiaNews - ${this.props.category}`;
  }

  async updateNews() {
    let url = `https://newsdata.io/api/1/latest?apikey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&language=en`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    let results = Array.isArray(parsedData.results)? parsedData.results: parsedData.results? [parsedData.results]: [];

    this.setState({
      results: results,
      totalResults: parsedData.totalResults || 0,
      loading: false,
      hasMore: parsedData.nextPage !== null,
      nextPage: parsedData.nextPage
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const { nextPage } = this.state;

    if (!nextPage) {
      this.setState({ hasMore: false });
      return;
    }

    let url = `https://newsdata.io/api/1/latest?apikey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${nextPage}&language=en`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      results: [...this.state.results, ...parsedData.results],
      nextPage: parsedData.nextPage,
      hasMore: parsedData.nextPage !== null
    });
  };

  handleOpenModal = (article) => {
    this.setState({ selectedArticle: article });
  };

  handleCloseModal = () => {
    this.setState({ selectedArticle: null });
  };

  render() {
    return (
      <>
        <div className="news-container">
          <div className="news-hero">
            <div className="hero-content">
              <h1 className="hero-title">
                Discover <span className="gradient-text">{this.props.category}</span>
              </h1>
              <p className="hero-subtitle">
                Stay informed with the latest headlines from around the world
              </p>
            </div>
          </div>

          {this.state.loading && (
            <div className="loading-container">
              <Spinner />
            </div>
          )}

          <InfiniteScroll
            dataLength={this.state.results.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={
              <div className="loading-more">
                <Spinner />
              </div>
            }
            endMessage={
              <div className="end-message">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>You're all caught up!</p>
              </div>
            }
          >
            <div className="news-grid">
              {!this.state.loading &&
                this.state.results.map((element) => {
                  return (
                    <NewsItem
                      key={element.link}
                      title={element.title || "Untitled"}
                      description={element.description || "No description available"}
                      imageUrl={
                        element.image_url ||
                        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
                      }
                      url={element.link || "/"}
                      author={element.source_name || "Unknown"}
                      publishedAt={element.pubDate}
                      source={element.source_id}
                      content={element.content}
                      onOpenModal={this.handleOpenModal}
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>

        <BackToTop />

        {this.state.selectedArticle && (
          <NewsModal 
            article={this.state.selectedArticle} 
            onClose={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}

export function NewsWrapper(props) {
  const { country, category } = useParams();

  return (
    <News
      {...props}
      country={country}
      category={category}
      key={`${country}-${category}`}
    />
  );
}

export default NewsWrapper;