import { useState, useEffect } from "react";

const Home = (userData) => {
  const [hobby, setHobby] = useState({
    title: "",
    imgUrl: "",
    description: "",
  });
  const [hobbies, setHobbies] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const handlChange = (e) => {
    setHobby({ ...hobby, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchHobbies = async () => {
      const data = await fetch("http://localhost:3001/get-hobby", {
        headers: {
          Authorization: `somesupersecretsecret ${userData.token}`,
        },
      });
      const hobbies = await data.json();
      setHobbies(hobbies);
    };
    const fetchReports = async () => {
      const data = await fetch("http://localhost:3001/get-report");
      const reports = await data.json();
      setAllReports(reports);
    };
    fetchReports();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const settings = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hobby),
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:3001/add-hobby`,
        settings
      );
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  };
  return (
    <div>
      {userData.firstName ? (
        <div>
          <h1>Welcome {userData.firstName}</h1>
          {hobbies ? (
            <div>
              <h3>Your Hobbies</h3>
              <ul>
                {hobbies.map((hobby) => (
                  <li>{hobby.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <h3>You have no hobbies yet</h3>
          )}
          <h3>Add new hobby</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">
                Title
                <input
                  type="text"
                  name="title"
                  required
                  value={hobby.title}
                  onChange={handlChange}
                />
              </label>
              <label htmlFor="imgUrl">
                Image Url
                <input
                  type="text"
                  name="imgUrl"
                  value={hobby.imageUrl}
                  onChange={handlChange}
                />
              </label>
              <label htmlFor="password">
                Description
                <input
                  type="description"
                  name="description"
                  value={hobby.description}
                  onChange={handlChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          {allReports.length > 0 ? (
            <div>
              <h3>Reports</h3>
              <ul>
                {allReports.map((n) => (
                  <div>
                    <h1>{n.Location}</h1>
                    <p>{n.description}</p>
                    <p>{n.date}</p>
                    <p>Reported by: {n.name}</p>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <h3>No reports yet</h3>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
