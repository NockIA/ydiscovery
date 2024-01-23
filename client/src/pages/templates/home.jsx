import { useState, useEffect } from "react";
import NavigationBar from "../../components/nav/nav";
import { apiUrl } from "../../utils/api";
import "../styles/home.css";
import "../../style/index.css";
import { ArticleCard } from "../../components/articleCard/articleCard";
import axios from "axios";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  useEffect(() => {
    axios
      .get(apiUrl + "articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.err(err.message);
      });
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchContent(event.target.value);

    if (searchTerm === "") {
      setFilteredArticles([]);
    } else {
      const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().startsWith(searchTerm)
      );
      setFilteredArticles(filteredArticles);
    }
  };

  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_home_page">
        <div className="container_search_bar rowContainer">
          <span className="material-symbols-outlined">search</span>
          <input
            className="search_bar"
            placeholder="Enter your hero name..."
            type="search"
            name="search"
            value={searchContent}
            onChange={handleSearch}
          />
        </div>
        <section className="rowContainer container_articles">
          {articles.length > 0 && searchContent === ""
            ? articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  id={article.articleId}
                  title={article.title}
                  subtitle={article.subtitle}
                  publicationDate={article.publicationDate}
                  illustrationLink={article.illustrationLink}
                  authorName={article.authorName}
                />
              ))
            : filteredArticles.length > 0 &&
              filteredArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  id={article.articleId}
                  title={article.title}
                  subtitle={article.subtitle}
                  publicationDate={article.publicationDate}
                  illustrationLink={article.illustrationLink}
                  authorName={article.authorName}
                />
              ))}
        </section>
      </main>
    </>
  );
};
