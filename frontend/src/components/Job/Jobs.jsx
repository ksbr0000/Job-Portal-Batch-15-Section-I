import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter jobs based on the search term (title, category, or country)
  const filteredJobs = jobs.jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for jobs by title, category, or country..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="banner">
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })
          ) : (
            <p>No jobs found matching your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
