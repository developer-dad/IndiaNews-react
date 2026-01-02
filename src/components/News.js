import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

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

  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

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


  render() {
    return (
      <div className="container pt-5 px-3">
        <h2 style={{ fontSize: "50px", margin: "30px 0px" }}>
          IndiaNews - Top {this.props.category} HeadLines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="row my-3">
            {!this.state.loading &&
              this.state.results.map((element) => {
                return (
                  <div className="col-md-4 mb-3" key={element.link}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 46) : " "}
                      description={
                        element.description
                          ? element.description.slice(0, 93)
                          : " "
                      }
                      imageUrl={element.image_url}
                      url={element.link ? element.link : "/"}
                      author={
                        element.source_name ? element.source_name : "Unknown"
                      }
                      publishedAt={element.pubDate}
                      source={element.source_id}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
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