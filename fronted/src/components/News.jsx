import React from "react";
import { useState, useEffect } from "react";

const News = (userData) => {
  const [news, setNews] = useState({
    name: userData.firstName + " " + userData.lastName,
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [allNews, setAllNews] = useState([]);
  
  useEffect(() => {fetchNews()}, []);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const fetchNews = async () => {
    const data = await fetch("http://localhost:3001/get-news");
    const news = await data.json();
    setAllNews(news);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const settings = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    };

    fetch("http://localhost:3001/add-news", settings)
      .then((data) => {return data.json()})
      .then((post) => {fetchNews()});
  };

  return (
    <div>
      {userData.firstName ? (
        <div>
          <h3>Add News</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">
                Title
                <input
                  type="text"
                  name="title"
                  required
                  value={news.title}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="date">
                Date
                <input
                  type="date"
                  name="date"
                  required
                  value={news.date}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  name="description"
                  required
                  value={news.description}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <></>
      )}

      {allNews.length > 0 ? (
        <div>
          <h3>News</h3>
          <ul>
            {allNews.map((n) => (
              <div>
                <h1>{n.title}</h1>
                <p>{n.description}</p>
                <p>{n.date}</p>
                <p>written by: {n.name}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <h3>No news yet</h3>
      )}
    </div>
  );
};
export default News;
