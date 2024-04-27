import { useEffect, useState, useContext } from "react"

import axios from 'axios';
import { API } from '../api';
import { AuthContext } from "../contexts/AuthContexts"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom"

export function JobDelete() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingJob, setLoadingJob] = useState(false)
    const [job, setJob] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)

    useEffect(() => {
        if(job && !job.is_owner) {
            navigate('/')
        }
        return () => null
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
                .finally(() => {
                    setLoadingJob(false)
                })
        }
        fetchJob();
        return () => null
    }, [id, token]);
    console.log(job)



    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.delete(API.jobs.delete(id), {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                navigate(`/`)
            })
            .finally(() => {
                setLoading(false)
            })


    }

    return (
        <div>
            {loading && "Submitting..."}
            {loadingJob && "Fetching Job Details...."}
            {job && (

                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <button className="bg-red-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-red-200" type="submit">Submit</button>
                    </div>
                </form>

            )}
        </div>
    )
}
