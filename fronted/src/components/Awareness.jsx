import React from "react";
import { useState, useEffect } from "react";

const Awareness = (userData) => {
  const [awareness, setAwareness] = useState({
    name: userData.firstName + " " + userData.lastName,
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [allAwareness, setAllAwareness] = useState([]);
  
  useEffect(() => {fetchAwareness()}, []);

  const handleChange = (e) => {
    setAwareness({ ...awareness, [e.target.name]: e.target.value });
  };

  const fetchAwareness = async () => {
    const data = await fetch("http://localhost:3001/get-awareness");
    const awareness = await data.json();
    setAllAwareness(awareness);
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
      body: JSON.stringify(awareness),
    };

    fetch("http://localhost:3001/add-awareness", settings)
      .then((data) => {return data.json()})
      .then((post) => {fetchAwareness()});
  };

  return (
    <div>
      {userData.firstName ? (
        <div>
          <h3>Add Awareness Article</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">
                Title
                <input
                  type="text"
                  name="title"
                  required
                  value={awareness.title}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="date">
                Date
                <input
                  type="date"
                  name="date"
                  required
                  value={awareness.date}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  name="description"
                  required
                  value={awareness.description}
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

      {allAwareness.length > 0 ? (
        <div>
          <h3>Awareness Articles</h3>
          <ul>
            {allAwareness.map((n) => (
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
        <h3>No awareness articles yet</h3>
      )}
    </div>
  );
};
export default Awareness;
