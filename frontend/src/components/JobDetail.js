import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { API } from "../api"
import { useParams } from "react-router"
import { useNavigate, NavLink } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContexts"


export function JobDetail() {
    const [job, setJob] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(job && !job.is_owner) {
            navigate('/')
        }
    })

    useEffect(() => {
        function fetchJob() {
            axios.get(API.jobs.retrieve(id), {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
                .then(res => {
                    setJob(res.data);
                })
        }
        fetchJob();
    }, [id, token]);




    return (
        <div>
            {!job && "Loading..."}
            {job && (
                <div>
                    <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm mt-2">
                        <div className="flex item-center justify-between">
                            <NavLink to={`/jobs/${job.id}`}>
                                <h3 className="text-2xl text-gray-800 font-semibold">{job.title}</h3>
                            </NavLink>
                            <div className="text-gray-800">
                                Added on{" "}
                                {new Date(job.date_created).toDateString()}
                            </div>
                        </div>

                        <p className="mt-1 text-lg text-gray-600">Rs.{job.salary}</p>
                        <p className="mt-1 italic text-sm text-gray-500">
                            {job.company_name}
                            <a className="ml-3 text-blue-500 hover:text-blue-600 text-sm" href={job.company_website}>Visit Website</a>
                        </p>
                        {job.remote && (
                            <p className="text-gray-500">
                                📍 Remote
                            </p>
                        )}
                        {job.location && (
                            <p className="mt-2 text-gray-500">
                               {job.location}
                            </p>
                        )}
                    </div>
                    {job.is_owner && (
                        <div className="mt-4 flex item-center">
                        <NavLink to={`/jobs/${id}/update`} 
                        className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200">
                            Update
                        </NavLink>

                        {!job.sponsored && (
                        <NavLink to={`/jobs/${id}/sponsor`} 
                        className="bg-green-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-green-200 ml-2">
                            Sponsor
                        </NavLink>
                        )}

                        <NavLink to={`/jobs/${id}/delete`} 
                        className="bg-red-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-red-200 ml-2">
                            Delete
                        </NavLink>
                    </div>
                    )}
                </div>

            )}
        </div>
    )
}