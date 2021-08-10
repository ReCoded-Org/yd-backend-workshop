
import React, { useState, useEffect } from "react";

const Reports = (userData) => {
    console.log(userData);
    const [reports, setReports] = useState({

        name: userData.firstName + " " + userData.lastName,
        location: "",
        date: new Date().toString().split("T")[0],
        description: "",
    });
    const [allReports, setAllReports] = useState([]);

    useEffect(() => {fetchReports()}, []);

    const handleChange = (e) => {
        setReports({ ...reports, [e.target.name]: e.target.value});
    };

    const fetchReports = async() => {
        const data = await fetch("http://localhost:3001/get-report");
        const reports = await data.json();
        setAllReports(reports);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const settings = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userData.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reports),
        };

        fetch("http://localhost:3001/add-report", settings)
            .then((data) => {return data.json()})
            .then((post) => {fetchReports()});
    };

    return (
        <div>
            {userData.firstName ? (
                <div>
                    <h3>Add Reports</h3>
                    <form onSubmit = {handleSubmit}>
                        <div>
                            <label htmlFor="firstName">
                                Location
                                <input
                                type="text"
                                name="location"
                                required
                                value={reports.title}
                                onChange={handleChange}/>
                    
                            </label>
                            <label htmlFor="date">
                                Date
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={reports.date}
                                    onChange={handleChange}
                                    />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea
                                    type="text"
                                    name="description"
                                    required
                                    value={reports.description}
                                    onChange={handleChange}
                                    />
                            </label>    
                            
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ):(
                <></>
            )}

            {allReports.length > 0 ? (
                <div>
                    <h3>Reports</h3>
                    <ul>
                        {allReports.map((n) =>(
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
    );
};
export default Reports;