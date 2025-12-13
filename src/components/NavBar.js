import React from "react";
import { Link, useParams } from "react-router-dom";

export default function NavBar() {
  const { country = "in", category = "top" } = useParams();

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to={`/${country}/${category}`}>
          IndiaNews
        </Link>

        <div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-3">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </span>
              <ul className="dropdown-menu">
                {[
                  "top",
                  "business",
                  "entertainment",
                  "health",
                  "science",
                  "sports",
                  "technology",
                ].map((cat) => (
                  <li key={cat}>
                    <Link className="dropdown-item" to={`/${country}/${cat}`}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Country
              </span>
              <ul className="dropdown-menu">
                {[
                  { code: "in", name: "India" },
                  { code: "us", name: "USA" },
                  { code: "ru", name: "Russia" },
                  { code: "gb", name: "UK" },
                  { code: "cn", name: "China" },
                ].map((c) => (
                  <li key={c.code}>
                    <Link className="dropdown-item" to={`/${c.code}/${category}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
