import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import { NavLink } from "react-router-dom";

function JobListItem({ job }) {
  console.log(job.title, job.sponsored);
  return (
    <div className="mt-2 border border-gray-200 px-3 py-3 shadow-sm rounded-sm mt-2">
      <div className="flex item-center justify-between">
        <div className="flex items-center justify-between">
        {job.company_logo && (
          <img src={job.company_logo} className="h-20 w-20 px-3 py-3" alt={job.company_name} />
        )}
        <NavLink to={`/jobs/${job.id}`}>
          <h3 className="text-2xl text-gray-800 font-semibold">
            {job.title}
            {job.sponsored && (
              <span className="bg-green-100 text-green-600 px-2 py-2 ml-2 rounded-md text-sm">
                sponsored
              </span>
            )}
          </h3>
        </NavLink>
        </div>
        <div className="text-gray-800">
          Added on {new Date(job.date_created).toDateString()}
        </div>
      </div>

      <p className="mt-1 text-lg text-gray-600">Salary-{job.salary}</p>
      <p className="mt-1 italic text-sm text-gray-500">
        {job.company_name}
        <a
          className="ml-3 text-blue-500 hover:text-blue-600 text-sm"
          href={job.company_website}
        >
          Visit Website
        </a>
      </p>
      {job.remote && <p className="text-gray-500">📍 Remote</p>}
      {job.location && <p className="mt-2 text-gray-500">{job.location}</p>}
    </div>
  );
}

export function JobList() {
  const [jobs, setJobs] = useState(null);
  const [sponsoredJobs, setSponsoredJobs] = useState(null);

  useEffect(() => {
    function fetchJobs() {
      axios.get(API.jobs.list)
      .then((res) => {
        const sponsoredJobs = res.data.filter((job) => job.sponsored);
        const restOfJobs = res.data.filter((job) => !job.sponsored);
        setJobs(restOfJobs);
        setSponsoredJobs(sponsoredJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
    }
    fetchJobs();
    return () => null;
  }, []);

  return (
    <div>
      {!jobs && "Loading..."}
      {sponsoredJobs &&
        sponsoredJobs.map((job) => {
          return <JobListItem key={job.id} job={job} />;
        })}
      {jobs &&
        jobs.map((job) => {
          return <JobListItem key={job.id} job={job} />;
        })}
    </div>
  );
}
