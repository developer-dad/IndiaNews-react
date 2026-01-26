import { useEffect } from "react";
import "./css/NewsModal.css";

export default function NewsModal({ article, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">{article.title}</h1>
            <div className="modal-meta">
              <span className="modal-source">{article.author}</span>
              <span className="modal-divider">•</span>
              <span className="modal-date">{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {article.imageUrl && (
            <div className="modal-image-wrapper">
              <img src={article.imageUrl} alt={article.title} className="modal-image" />
            </div>
          )}

          <div className="modal-body">
            {article.description && (
              <p className="modal-description">{article.description}</p>
            )}
            
            {article.content && (
              <div className="modal-article">
                <p>{article.content}</p>
              </div>
            )}

            {!article.content && !article.description && (
              <p className="modal-no-content">
                Full article content is not available. Please visit the original source to read more.
              </p>
            )}
          </div>

          <div className="modal-footer">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-button"
            >
              Read Full Article on {article.source}
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
