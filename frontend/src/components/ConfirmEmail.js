import { useState } from "react"
import axios from 'axios';
import { API } from '../api';
import { useParams } from "react-router-dom";

export function ConfirmEmail() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { key } = useParams()
    console.log(key);
    

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.post(API.auth.verifyEmail, {key})
            .then(res => {
                setSuccess(true)
            })
            .finally(() => setLoading(false))

    }

    return (
        <div>
            {success && "Your email has been varified! Yu can now login"}
            {loading && "Loading..."}
            <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <button className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" type="submit">Submit</button>
                        </div>
            </form>
        </div>
    )
}
