import React, { Component } from "react";
import './css/NewsItem.css'

const FALLBACK_IMAGE = "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"

export class NewsItem extends Component {
    constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.imageUrl || FALLBACK_IMAGE
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        imgSrc: this.props.imageUrl || FALLBACK_IMAGE
      });
    }
  }

  handleImageError = () => {
    this.setState({ imgSrc: FALLBACK_IMAGE });
  };

  render() {
    let { title, description,  url, author, publishedAt, source } = this.props;

    return (
      <div className="card">
        <img src={this.state.imgSrc} className="card-img-top" alt={title} onError={this.handleImageError}/>
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
          <p className="card-text mt-2">
            <small className="text-body-secondary">
              By {author} on {publishedAt}
            </small>
          </p>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      </div>
    );
  }
}

export default NewsItem;