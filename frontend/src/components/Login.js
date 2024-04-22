import { useContext, useState } from "react"
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { API } from '../api';
import { AuthContext } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom"

export function Login() {
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()


    function handleSubmit(values) {
        setLoading(true)
        axios.post(API.auth.login, values)
            .then(res => {
                login(res.data.key)
                navigate(`/`)
            })
            .finally(() => setLoading(false))

    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>

                        {/* <label htmlFor="username">Username</label>
                        <Field id="username" name="username" placeholder="Username" /> */}
                        <Field name="email">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Email</span>
                                    <input {...field} type="email" className="mt-1 block w-full rounded-md" placeholder="email"
                                        style={
                                            form.touched.email && form.errors.email ? (
                                                { border: '2px solid var(--primary-red' }
                                            ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.username && touched.username ? (
                            <div>{errors.username}</div>
                        ) : null} */}

                        {/* <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="Password" /> */}
                        <Field name="password">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Password</span>
                                    <input {...field} type="Password" className="mt-1 block w-full rounded-md"
                                        style={
                                            form.touched.password && form.errors.password ? (
                                                { border: '2px solid var(--primary-red' }
                                            ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null} */}



                        <div className="mt-2">
                            <button className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" type="submit">Submit</button>
                        </div>
                    </Form>
                )}



            </Formik>
        </div>
    )
}
