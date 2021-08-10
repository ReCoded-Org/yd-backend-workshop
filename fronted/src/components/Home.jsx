import { useState, useEffect } from "react";

const Home = (userData) => {
  const [hobby, setHobby] = useState({
    title: "",
    imgUrl: "",
    description: "",
  });
  const [hobbies, setHobbies] = useState(null);
  
  const [allReports, setAllReports] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const handlChange = (e) => {
    setHobby({ ...hobby, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(userData)
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
    const fetchNews = async () => {
      const data = await fetch("http://localhost:3001/get-news");
      const news = await data.json();
      console.log("news", news)
      setAllNews(news);
    };
    fetchNews();
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
      <div className="jumbatron">

</div>
      {userData.firstName ? (
        <div>
          <h1>Welcome {userData.firstName}</h1>
          
          
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

{allReports.length > 0 ? (
            <div>
              <h3>News</h3>
              <ul>
                {allNews.map((n) => {
               
                return(
                  
                  <div>
                    <h5>{n.title}</h5>
                    <p>{n.description}</p>
                    <p>{n.date}</p>
                  </div>
                )})}
              </ul>
            </div>
          ) : (
            <h3>No news yet</h3>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
